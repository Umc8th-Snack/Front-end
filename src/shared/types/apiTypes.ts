import { AxiosError } from 'axios';

// 기본 API 응답 타입
export interface ApiResponseTypes<T = unknown> {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T | null;
    error?: unknown;
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

// 토큰 타입
export interface TokenTypes {
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
}

// 로그인 요청 타입
export interface LoginRequestTypes {
    email: string;
    password: string;
}

// 로그인 응답 타입
export interface LoginResponseTypes {
    userId: number;
    email: string;
    nickname: string;
}

// 회원가입 요청 타입
export interface SignupRequestTypes {
    email: string;
    password: string;
    nickname: string;
}

// 회원가입 응답 타입
export interface SignupResponseTypes {
    userId: number;
    email: string;
    nickname: string;
}

// API 표준 응답 타입 (API 명세 기준)
export interface ApiStandardResponseTypes<T = unknown> {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
    error?: unknown;
}

// 소셜 로그인 응답 타입
export interface SocialLoginResponseTypes {
    userId: number;
    email: string;
    nickname: string;
    profileImage?: string;
    isNewUser?: boolean;
}
