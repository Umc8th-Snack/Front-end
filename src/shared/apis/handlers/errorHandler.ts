import type { CustomAxiosErrorTypes } from '../../types/apiTypes';
import { ERROR_MESSAGES, HTTP_STATUS } from '../constants/apiConstants';

/**
 * API 에러 처리 함수
 */
export const handleApiError = (error: CustomAxiosErrorTypes): void => {
    if (error.response) {
        // 서버 응답이 있는 경우
        handleServerError(error);
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
const handleServerError = (error: CustomAxiosErrorTypes): void => {
    const { status, data } = error.response!;
    const errorMessage = data?.message || ERROR_MESSAGES.UNKNOWN_ERROR;

    switch (status) {
        case HTTP_STATUS.UNAUTHORIZED:
            handleUnauthorizedError();
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
 * 401 에러 처리 함수
 */
const handleUnauthorizedError = (): void => {
    console.error(ERROR_MESSAGES.UNAUTHORIZED);
    // TODO: 토큰 갱신 로직 구현
    // - refreshToken으로 accessToken 갱신 시도
    // - 실패 시 로그인 페이지로 리다이렉트
    // - 성공 시 실패한 요청 재시도
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
