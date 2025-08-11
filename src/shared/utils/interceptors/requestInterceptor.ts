import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

/**
 * 토큰을 가져오는 함수 (나중에 구현)
 */
const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken');
};

/**
 * Request 인터셉터 - 성공 핸들러
 */
export const handleRequestSuccess = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // 토큰 추가
    const token = getAccessToken();
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // 개발 환경에서 요청 로깅
    if (import.meta.env.DEV) {
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
};

/**
 * Request 인터셉터 - 에러 핸들러
 */
export const handleRequestError = (error: AxiosError): Promise<AxiosError> => {
    if (import.meta.env.DEV) {
        console.error('[API Request Error]', error);
    }
    return Promise.reject(error);
};
