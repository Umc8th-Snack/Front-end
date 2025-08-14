import { ERROR_MESSAGES, HTTP_STATUS } from '../constants/apiConstants';
import type { CustomAxiosErrorTypes } from '../types/apiTypes';

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
 * 401 에러 처리 함수 - Response Interceptor에서 처리되지 않은 경우만
 */
const handleUnauthorizedError = async (error: CustomAxiosErrorTypes): Promise<void> => {
    const errorCode = error.response?.data?.code;

    // Response Interceptor에서 이미 처리된 경우 로그만 출력
    console.log('🔍 [ERROR HANDLER] 401 에러 감지 (Response Interceptor에서 처리됨):', {
        errorCode,
        status: error.response?.status,
    });

    // Response Interceptor에서 처리하지 못한 특수한 경우만 처리
    switch (errorCode) {
        // Refresh Token 관련 에러는 Response Interceptor에서 처리됨
        case 'AUTH_2164': // Refresh 토큰이 만료됨
        case 'AUTH_2165': // 서버에 Refresh 토큰이 존재하지 않음
        case 'AUTH_2163': // Refresh 토큰이 존재하지 않음
        case 'AUTH_2167': // 해당 계정은 토큰을 재발급 받을 수 없음
            console.log('⚠️ [ERROR HANDLER] Refresh 토큰 문제 - Response Interceptor에서 처리되어야 함');
            break;

        // Access Token 관련 에러도 Response Interceptor에서 처리됨
        case 'AUTH_2166': // Access 토큰이 만료됨
        case 'AUTH_2161': // 유효하지 않은 Access 토큰
            console.log('⚠️ [ERROR HANDLER] Access 토큰 문제 - Response Interceptor에서 처리되어야 함');
            break;

        default:
            // 기타 401 에러
            console.log('⚠️ [ERROR HANDLER] 기타 401 에러');
    }
};

// attemptTokenReissue와 handleForceLogout 함수는 Response Interceptor로 이동됨
// 토큰 재발급은 Response Interceptor에서 중앙 집중식으로 처리하여 중복 발급 방지

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
