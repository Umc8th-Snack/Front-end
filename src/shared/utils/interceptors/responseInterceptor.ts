import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

import { authApi } from '../../apis/auth';
import type { ApiErrorTypes, CustomAxiosErrorTypes } from '../../types/apiTypes';
import { tokenUtils } from '../auth';
import { handleApiError } from '../errorHandler';
import { tokenRefreshQueue } from '../tokenRefreshQueue';

/**
 * Response 인터셉터 - 성공 핸들러
 */
export const handleResponseSuccess = (response: AxiosResponse): AxiosResponse => {
    // 개발 환경에서 응답 로깅
    if (import.meta.env.DEV) {
        console.log(`[API Response] ${response.config.url}`, {
            status: response.status,
            data: response.data,
            headers: response.headers,
        });
    }

    return response;
};

/**
 * Response 인터셉터 - 에러 핸들러 (토큰 재발급 큐잉 포함)
 */
export const handleResponseError = async (error: AxiosError<ApiErrorTypes>): Promise<CustomAxiosErrorTypes> => {
    const customError = error as CustomAxiosErrorTypes;
    customError.isApiError = true;

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const errorCode = error.response?.data?.code;

    // 401 에러이고 Access Token 관련 에러인 경우
    if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        (errorCode === 'AUTH_2166' || errorCode === 'AUTH_2161') // Access Token 만료 또는 유효하지 않음
    ) {
        // 이미 토큰 재발급 중인 경우 - 대기열에 추가
        if (tokenRefreshQueue.getIsRefreshing()) {
            console.log('⏳ [RESPONSE INTERCEPTOR] 토큰 재발급 중... 대기열 추가');

            try {
                // 대기열에서 새 토큰 대기
                const config = await tokenRefreshQueue.addToQueue(originalRequest);
                // 새 토큰으로 원본 요청 재시도
                return axios({
                    ...originalRequest,
                    headers: {
                        ...originalRequest.headers,
                        ...config.headers,
                    },
                });
            } catch (queueError) {
                return Promise.reject(queueError);
            }
        }

        // 토큰 재발급 시작
        originalRequest._retry = true;
        tokenRefreshQueue.startRefreshing();

        try {
            console.log('🔄 [RESPONSE INTERCEPTOR] 토큰 재발급 시도');

            // 토큰 재발급 요청 (Refresh Token은 쿠키로 자동 전송)
            const reissueResponse = await authApi.reissueTokenWithToken();

            if (reissueResponse.token) {
                // 새 Access Token 저장
                tokenUtils.setAccessToken(reissueResponse.token);

                // 사용자 정보 업데이트
                if (reissueResponse.data) {
                    localStorage.setItem('user', JSON.stringify(reissueResponse.data));
                }

                console.log('✅ [RESPONSE INTERCEPTOR] 토큰 재발급 성공');

                // 대기열의 모든 요청 처리
                tokenRefreshQueue.processQueue(reissueResponse.token);
                tokenRefreshQueue.stopRefreshing();

                // 원본 요청 재시도
                originalRequest.headers.Authorization = `Bearer ${reissueResponse.token}`;
                return axios(originalRequest);
            } else {
                throw new Error('토큰 재발급 실패');
            }
        } catch (refreshError) {
            console.error('❌ [RESPONSE INTERCEPTOR] 토큰 재발급 실패:', refreshError);

            // 대기열의 모든 요청 거부
            tokenRefreshQueue.rejectQueue(refreshError as AxiosError);
            tokenRefreshQueue.stopRefreshing();

            // 강제 로그아웃 처리는 errorHandler에서
            await handleApiError(customError);
            return Promise.reject(customError);
        }
    }

    // 그 외 에러는 기존 처리 로직으로
    await handleApiError(customError);
    return Promise.reject(customError);
};
