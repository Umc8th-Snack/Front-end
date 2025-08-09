import { authApi } from '../apis/auth';
import { ERROR_MESSAGES, HTTP_STATUS } from '../constants/apiConstants';
import type { CustomAxiosErrorTypes } from '../types/apiTypes';
import { tokenUtils } from './auth';

/**
 * API 에러 처리 함수
 */
export const handleApiError = async (error: CustomAxiosErrorTypes): Promise<void> => {
    if (error.response) {
        // 서버 응답이 있는 경우
        await handleServerError(error);
    } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        console.error(ERROR_MESSAGES.NETWORK_ERROR);
    } else {
        // 요청 설정 중 오류가 발생한 경우
        console.error(ERROR_MESSAGES.REQUEST_ERROR);
    }
};

/**
 * 서버 에러 처리 함수
 */
const handleServerError = async (error: CustomAxiosErrorTypes): Promise<void> => {
    const { status, data } = error.response!;
    const errorMessage = data?.message || ERROR_MESSAGES.UNKNOWN_ERROR;

    switch (status) {
        case HTTP_STATUS.UNAUTHORIZED:
            await handleUnauthorizedError(error);
            break;
        case HTTP_STATUS.FORBIDDEN:
            console.error(ERROR_MESSAGES.FORBIDDEN);
            break;
        case HTTP_STATUS.NOT_FOUND:
            console.error(ERROR_MESSAGES.NOT_FOUND);
            break;
        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        case HTTP_STATUS.SERVICE_UNAVAILABLE:
            console.error(ERROR_MESSAGES.SERVER_ERROR);
            break;
        default:
            console.error(`API 오류: ${errorMessage}`);
    }
};

/**
 * 401 에러 처리 함수 - API 문서 기반 완전한 토큰 관리
 */
const handleUnauthorizedError = async (error: CustomAxiosErrorTypes): Promise<void> => {
    const errorCode = error.response?.data?.code;

    // API 문서의 에러 코드별 처리
    console.log('🔍 [ERROR HANDLER] 401 에러 분석:', { errorCode, status: error.response?.status });

    switch (errorCode) {
        case 'AUTH_2166': // Access 토큰이 만료됨 - 재발급 시도
        case 'AUTH_2161': // 유효하지 않은 Access 토큰 - 재발급 시도
            console.log('🔄 [ERROR HANDLER] Access 토큰 문제 감지, 재발급 시도...');
            await attemptTokenReissue(error);
            break;

        case 'AUTH_2164': // Refresh 토큰이 만료됨 - 로그아웃
        case 'AUTH_2165': // 서버에 Refresh 토큰이 존재하지 않음 - 로그아웃
        case 'AUTH_2163': // Refresh 토큰이 존재하지 않음 - 로그아웃
        case 'AUTH_2167': // 해당 계정은 토큰을 재발급 받을 수 없음 - 로그아웃
            console.log('🚪 [ERROR HANDLER] Refresh 토큰 문제 감지, 로그아웃 처리...');
            handleForceLogout();
            break;

        default:
            // 일반적인 401 에러 - 재발급 시도 후 실패시 로그아웃
            console.log('⚠️ [ERROR HANDLER] 일반 401 에러, 재발급 시도...');
            await attemptTokenReissue(error);
    }
};

/**
 * 토큰 재발급 시도
 */
const attemptTokenReissue = async (_originalError: CustomAxiosErrorTypes): Promise<void> => {
    try {
        console.log('🔄 [ERROR HANDLER] 토큰 재발급 요청 중...');

        // /api/auth/reissue 호출 (쿠키의 Refresh Token 자동 사용)
        const reissueResponse = await authApi.reissueTokenWithToken();

        // 새 Access Token 저장
        if (reissueResponse.token) {
            tokenUtils.setAccessToken(reissueResponse.token);

            // 사용자 정보도 업데이트 (필요시)
            localStorage.setItem('user', JSON.stringify(reissueResponse.data));

            console.log('✅ [ERROR HANDLER] 토큰 재발급 성공, 새 토큰 저장 완료');
        } else {
            throw new Error('재발급된 토큰을 찾을 수 없습니다.');
        }

        // 원본 요청 재시도는 response interceptor에서 처리하는 것이 더 적절
        // 여기서는 토큰 저장까지만 수행
    } catch (reissueError) {
        console.error('❌ [ERROR HANDLER] 토큰 재발급 실패:', reissueError);
        handleForceLogout();
    }
};

/**
 * 강제 로그아웃 처리
 */
const handleForceLogout = (): void => {
    console.log('🚪 [ERROR HANDLER] 강제 로그아웃 처리 중...');

    // localStorage에서 토큰 제거
    tokenUtils.removeAccessToken();
    console.log('🧹 [ERROR HANDLER] Access Token 제거 완료');

    // 사용자 정보 제거
    localStorage.removeItem('user');
    console.log('🧹 [ERROR HANDLER] 사용자 정보 제거 완료');

    // 홈페이지로 리다이렉트
    console.log('🏠 [ERROR HANDLER] 홈페이지로 리다이렉트');
    window.location.href = '/';

    // 사용자에게 알림 (선택사항)
    alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
};

/**
 * 에러 메시지 파싱 함수
 */
export const parseErrorMessage = (error: CustomAxiosErrorTypes): string => {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    if (error.response) {
        const status = error.response.status;
        switch (status) {
            case HTTP_STATUS.UNAUTHORIZED:
                return ERROR_MESSAGES.UNAUTHORIZED;
            case HTTP_STATUS.FORBIDDEN:
                return ERROR_MESSAGES.FORBIDDEN;
            case HTTP_STATUS.NOT_FOUND:
                return ERROR_MESSAGES.NOT_FOUND;
            case HTTP_STATUS.INTERNAL_SERVER_ERROR:
            case HTTP_STATUS.SERVICE_UNAVAILABLE:
                return ERROR_MESSAGES.SERVER_ERROR;
            default:
                return ERROR_MESSAGES.UNKNOWN_ERROR;
        }
    }

    if (error.request) {
        return ERROR_MESSAGES.NETWORK_ERROR;
    }

    return ERROR_MESSAGES.REQUEST_ERROR;
};
