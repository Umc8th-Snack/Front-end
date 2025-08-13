import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

/**
 * 토큰을 가져오는 함수 (나중에 구현)
 */
const getAccessToken = (): string | null => {
    // TODO: 실제 토큰 관리 로직 구현
    // localStorage, sessionStorage, 또는 상태 관리에서 토큰 가져오기
    return null;
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
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
            data: config.data,
            params: config.params,
            headers: config.headers,
        });
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
