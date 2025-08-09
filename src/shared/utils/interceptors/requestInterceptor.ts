import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { tokenUtils } from '@/shared/utils/auth';

/**
 * 토큰을 가져오는 함수
 */
const getAccessToken = (): string | null => {
    return tokenUtils.getAccessToken();
};

/**
 * Request 인터셉터 - 성공 핸들러
 */
export const handleRequestSuccess = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // 토큰 추가
    const token = getAccessToken();
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🎫 [REQUEST INTERCEPTOR] 토큰 자동 주입 완료');
    } else {
        console.log('❌ [REQUEST INTERCEPTOR] 토큰 없음 - 인증이 필요한 요청일 수 있음');
    }

    // 개발 환경에서 요청 로깅
    if (import.meta.env.DEV) {
        console.log(`📡 [REQUEST INTERCEPTOR] ${config.method?.toUpperCase()} ${config.url}`, {
            hasAuth: !!config.headers?.Authorization,
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
