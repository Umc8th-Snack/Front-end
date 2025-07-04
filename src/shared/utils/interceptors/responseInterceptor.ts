import type { AxiosError, AxiosResponse } from 'axios';

import type { ApiErrorTypes, CustomAxiosErrorTypes } from '../../types/apiTypes';
import { handleApiError } from '../errorHandler';

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
 * Response 인터셉터 - 에러 핸들러
 */
export const handleResponseError = (error: AxiosError<ApiErrorTypes>): Promise<CustomAxiosErrorTypes> => {
    // 에러 타입 확장
    const customError = error as CustomAxiosErrorTypes;
    customError.isApiError = true;

    // 에러 처리 로직 위임
    handleApiError(customError);

    return Promise.reject(customError);
};
