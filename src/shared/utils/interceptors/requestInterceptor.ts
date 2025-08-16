// src/shared/utils/interceptors/requestInterceptor.ts
import { AxiosError, AxiosHeaders, type AxiosHeaderValue, type InternalAxiosRequestConfig } from 'axios';

import { tokenUtils } from '@/shared/utils/auth';

/**
 * 토큰을 가져오는 함수
 */
const getAccessToken = (): string | null => {
    return tokenUtils.getAccessToken();
};

// --- helpers ---
const isFormData = (data: unknown): data is FormData => typeof FormData !== 'undefined' && data instanceof FormData;

const isURLSearchParams = (data: unknown): data is URLSearchParams =>
    typeof URLSearchParams !== 'undefined' && data instanceof URLSearchParams;

const isBlobLike = (data: unknown): boolean => typeof Blob !== 'undefined' && data instanceof Blob;

const isArrayBufferLike = (data: unknown): boolean => typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer;

const methodHasBody = (m?: string) => {
    const mm = (m ?? 'GET').toUpperCase();
    return mm === 'POST' || mm === 'PUT' || mm === 'PATCH';
};

// --- interceptor ---
export const handleRequestSuccess = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // 항상 AxiosHeaders 인스턴스로 맞춤
    const headers = (config.headers =
        config.headers instanceof AxiosHeaders
            ? config.headers
            : new AxiosHeaders(config.headers as Record<string, AxiosHeaderValue> | undefined));

    // 1) Authorization (토큰 재발급 요청은 제외)
    const isReissueRequest = config.url?.includes('/auth/reissue');
    const token = getAccessToken();

    if (!isReissueRequest && token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🎫 [REQUEST INTERCEPTOR] 토큰 자동 주입 완료');
    } else if (isReissueRequest) {
        console.log('🔄 [REQUEST INTERCEPTOR] 토큰 재발급 요청 - Authorization 헤더 제외');
    } else {
        console.log('❌ [REQUEST INTERCEPTOR] 토큰 없음 - 인증이 필요한 요청일 수 있음');
    }

    // 2) Accept 기본값
    if (!headers.has('Accept')) {
        headers.set('Accept', '*/*');
    }

    // 3) Content-Type 자동 설정
    const hasBody = methodHasBody(config.method);

    if (hasBody && !headers.has('Content-Type')) {
        if (isFormData(config.data)) {
            // multipart/form-data 는 브라우저가 boundary 포함해 자동 설정해야 함 -> 명시 제거
            headers.delete('Content-Type');
        } else if (isURLSearchParams(config.data)) {
            // 브라우저가 application/x-www-form-urlencoded 지정 → 건드리지 않음
        } else if (isBlobLike(config.data) || isArrayBufferLike(config.data)) {
            // 바이너리 → 지정하지 않음
        } else if (typeof config.data === 'string') {
            // 문자열 → 지정하지 않음 (서버에서 text/plain 등 처리)
        } else if (config.data && typeof config.data === 'object') {
            // 평범한 객체 → JSON
            headers.set('Content-Type', 'application/json');
        }
    }

    // 4) 개발 로깅(대용량/순환 참조 방지)
    if (import.meta.env.DEV) {
        const dataPreview = isFormData(config.data)
            ? '[FormData]'
            : isURLSearchParams(config.data)
              ? '[URLSearchParams]'
              : isBlobLike(config.data)
                ? '[Blob]'
                : isArrayBufferLike(config.data)
                  ? '[ArrayBuffer]'
                  : typeof config.data === 'string'
                    ? `[string:${(config.data as string).slice(0, 120)}...]`
                    : config.data;

        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
            params: config.params,
            headers: headers.toJSON?.() ?? headers, // AxiosHeaders → 평면 객체로 보기 좋게
            data: dataPreview,
        });
    }

    return config;
};

export const handleRequestError = (error: AxiosError): Promise<AxiosError> => {
    if (import.meta.env.DEV) {
        console.error('[API Request Error]', error);
    }
    return Promise.reject(error);
};
