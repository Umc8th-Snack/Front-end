import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { authApi } from '@/shared/apis/auth';
import axiosInstance from '@/shared/apis/axios'; // ✅ 재시도는 반드시 인스턴스로
import type { ApiErrorTypes, CustomAxiosErrorTypes } from '@/shared/types/apiTypes';
import { tokenUtils } from '@/shared/utils/auth';
import { handleApiError } from '@/shared/utils/errorHandler';
import { tokenRefreshQueue } from '@/shared/utils/tokenRefreshQueue';

// ─────────────────────────────────────────────────────────────
// 성공 핸들러
// ─────────────────────────────────────────────────────────────
export const handleResponseSuccess = (response: AxiosResponse): AxiosResponse => {
    if (import.meta.env.DEV) {
        console.log(`[API Response] ${response.config.url}`, {
            status: response.status,
            data: response.data,
            headers: response.headers,
        });
    }
    return response;
};

// ─────────────────────────────────────────────────────────────
// 에러 핸들러 (+ 토큰 재발급 큐잉)
// ─────────────────────────────────────────────────────────────
// 반환 타입은 재시도시 AxiosResponse 또는 throw 모두 가능하므로 any 권장
export const handleResponseError = async (error: AxiosError<ApiErrorTypes>): Promise<any> => {
    const customError = error as CustomAxiosErrorTypes;
    customError.isApiError = true;

    const originalRequest = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;
    const errorCode = error.response?.data?.code;

    // 인증 관련 요청은 재발급 로직 제외
    const isAuthRequest =
        originalRequest?.url?.includes('/api/auth/login') ||
        originalRequest?.url?.includes('/api/users/signup') ||
        originalRequest?.url?.includes('/api/auth/reissue');

    // 백엔드 코드 정의에 따라 관리하기 쉽게 집합으로 정리
    // ✅ 토큰 만료/유효하지 않음 → 리프레시 진행
    const TOKEN_ERROR_CODES = new Set(['AUTH_2166', 'AUTH_2161']);
    // ❌ 사용자 재인증 필요(예: 비밀번호 불일치 등) → 리프레시 금지, 메시지 노출
    const USER_REAUTH_CODES = new Set(['USER_2611']);

    // ── 401 처리 ───────────────────────────────────────────────
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry && !isAuthRequest) {
        // 1) 사용자 재인증 범주: 리프레시 금지, 즉시 UI 메시지
        if (USER_REAUTH_CODES.has(errorCode ?? '')) {
            if (import.meta.env.DEV) {
                console.log('🔐 [RESPONSE INTERCEPTOR] 사용자 재인증 필요 코드 감지:', errorCode);
            }
            await handleApiError(customError);
            return Promise.reject(customError);
        }

        // 2) 토큰 갱신 범주: 리프레시 플로우 수행
        if (TOKEN_ERROR_CODES.has(errorCode ?? '')) {
            // 이미 다른 요청이 리프레시 중 → 큐에 넣고 대기
            if (tokenRefreshQueue.getIsRefreshing()) {
                if (import.meta.env.DEV) {
                    console.log('⏳ [RESPONSE INTERCEPTOR] 토큰 재발급 중... 대기열 추가');
                }
                try {
                    const configFromQueue = await tokenRefreshQueue.addToQueue(originalRequest);
                    // ✅ 재시도는 axiosInstance로!
                    return axiosInstance({
                        ...originalRequest,
                        headers: { ...originalRequest.headers, ...configFromQueue.headers },
                    });
                } catch (queueError) {
                    return Promise.reject(queueError);
                }
            }

            // 리프레시 시작
            originalRequest._retry = true;
            tokenRefreshQueue.startRefreshing();

            try {
                if (import.meta.env.DEV) {
                    console.log('🔄 [RESPONSE INTERCEPTOR] 토큰 재발급 시도');
                }

                // Refresh Token은 쿠키로 전송된다고 가정
                const reissueResponse = await authApi.reissueTokenWithToken();

                if (reissueResponse.token) {
                    // 1) 새 Access Token 저장
                    tokenUtils.setAccessToken(reissueResponse.token);

                    // 2) 사용자 정보 동기화(선택)
                    if (reissueResponse.data) {
                        localStorage.setItem('user', JSON.stringify(reissueResponse.data));
                    }

                    if (import.meta.env.DEV) {
                        console.log('✅ [RESPONSE INTERCEPTOR] 토큰 재발급 성공');
                    }

                    // 3) 대기열 모두 처리(헤더 주입)
                    tokenRefreshQueue.processQueue(reissueResponse.token);
                    tokenRefreshQueue.stopRefreshing();

                    // 4) 원본 요청 재시도 - ✅ 인스턴스 사용
                    originalRequest.headers = originalRequest.headers ?? {};
                    (originalRequest.headers as any).Authorization = `Bearer ${reissueResponse.token}`;

                    return axiosInstance(originalRequest);
                }

                throw new Error('토큰 재발급 실패');
            } catch (refreshError: any) {
                console.error('❌ [RESPONSE INTERCEPTOR] 토큰 재발급 실패:', refreshError);

                // 큐에 대기 중인 요청 모두 거절
                tokenRefreshQueue.rejectQueue(refreshError);
                tokenRefreshQueue.stopRefreshing();

                // Refresh 토큰 관련 에러 → 강제 로그아웃
                const refreshErrorCode = refreshError?.response?.data?.code;
                if (
                    refreshErrorCode === 'AUTH_2164' || // Refresh 토큰 만료
                    refreshErrorCode === 'AUTH_2165' || // 서버에 Refresh 토큰 미존재
                    refreshErrorCode === 'AUTH_2163' || // Refresh 토큰 없음
                    refreshErrorCode === 'AUTH_2167' // 재발급 불가 계정
                ) {
                    console.log('🚪 [RESPONSE INTERCEPTOR] Refresh 토큰 문제 감지, 강제 로그아웃 처리');
                    tokenUtils.removeAccessToken();
                    localStorage.removeItem('user');
                    alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
                    window.location.href = '/';
                }

                return Promise.reject(customError);
            }
        }
    }

    // 인증 요청 자체의 401은 단순 로깅
    if (isAuthRequest && error.response?.status === 401) {
        console.log('🔐 [RESPONSE INTERCEPTOR] 인증 요청 401 에러 - 재발급 로직 건너뛰기', {
            url: originalRequest?.url,
            errorCode,
        });
    }

    // 그 외 에러는 공통 에러 핸들러
    await handleApiError(customError);
    return Promise.reject(customError);
};
