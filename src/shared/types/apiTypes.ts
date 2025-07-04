import { AxiosError } from 'axios';

// 기본 API 응답 타입
export interface ApiResponseTypes<T = unknown> {
    data: T;
    status: number;
    message: string;
}

// 페이지네이션 응답 타입
export interface PaginatedResponseTypes<T> {
    data: T[];
    page: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
}

// API 에러 타입
export interface ApiErrorTypes {
    message: string;
    code: string;
    statusCode: number;
    timestamp: string;
}

// Axios 에러 확장 타입
export interface CustomAxiosErrorTypes extends AxiosError<ApiErrorTypes> {
    isApiError: boolean;
}

// HTTP 메서드 타입
export type HttpMethodTypes = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// API 요청 옵션 타입
export interface ApiRequestOptionsTypes {
    headers?: Record<string, string>;
    params?: Record<string, unknown>;
    timeout?: number;
}

// 토큰 타입 (나중에 인증 구현시 사용)
export interface TokenTypes {
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
}
