// React Query 관련 상수
export const QUERY_CONFIG = {
    STALE_TIME: 5 * 60 * 1000, // 5분
    GC_TIME: 30 * 60 * 1000, // 30분 (v5에서는 gcTime으로 변경됨)
    REFETCH_ON_WINDOW_FOCUS: false,
    REFETCH_ON_RECONNECT: true,
} as const;

// 재시도 관련 상수 (React Query용)
export const QUERY_RETRY_CONFIG = {
    MAX_RETRY_COUNT: 2,
    RETRY_DELAY_BASE: 1000, // 1초
    MAX_RETRY_DELAY: 30000, // 30초
} as const;
