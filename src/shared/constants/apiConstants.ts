// API 관련 상수
export const API_TIMEOUT = 10000; // 10초
export const CONTENT_TYPE = 'application/json';

// HTTP 상태 코드
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
} as const;

// 에러 메시지
export const ERROR_MESSAGES = {
    NETWORK_ERROR: '네트워크 오류가 발생했습니다.',
    UNAUTHORIZED: '인증이 필요합니다.',
    FORBIDDEN: '접근 권한이 없습니다.',
    NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
    SERVER_ERROR: '서버 오류가 발생했습니다.',
    REQUEST_ERROR: '요청 설정 중 오류가 발생했습니다.',
    UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
} as const;

// API 기본 설정
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    WITH_CREDENTIALS: false,
    MAX_REDIRECTS: 5,
} as const;

// 재시도 설정
export const RETRY_CONFIG = {
    MAX_RETRY_COUNT: 2,
    RETRY_DELAY_BASE: 1000, // 1초
    MAX_RETRY_DELAY: 30000, // 30초
} as const;
