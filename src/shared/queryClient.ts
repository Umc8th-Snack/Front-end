import { QueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { HTTP_STATUS } from './apis/constants/apiConstants';
import { QUERY_CONFIG, QUERY_RETRY_CONFIG } from './constants/queryConstants';

// tanstack-query 전역 에러 타입 등록
declare module '@tanstack/react-query' {
    interface Register {
        defaultError: AxiosError;
    }
}

// 재시도 여부 판단 함수
const shouldRetryRequest = (failureCount: number, error: AxiosError): boolean => {
    // 최대 재시도 횟수 초과 시 재시도 안함
    if (failureCount >= QUERY_RETRY_CONFIG.MAX_RETRY_COUNT) return false;

    // 네트워크 에러이거나 5xx 서버 에러인 경우만 재시도
    if (!error.response) return true; // 네트워크 에러
    return error.response.status >= HTTP_STATUS.INTERNAL_SERVER_ERROR;
};

// 재시도 지연 시간 계산 함수 (exponential backoff)
const calculateRetryDelay = (attemptIndex: number): number => {
    const delay = QUERY_RETRY_CONFIG.RETRY_DELAY_BASE * 2 ** attemptIndex;
    return Math.min(delay, QUERY_RETRY_CONFIG.MAX_RETRY_DELAY);
};

// QueryClient 생성 및 설정
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // 데이터가 신선하게 유지되는 시간
            staleTime: QUERY_CONFIG.STALE_TIME,
            // 캐시에서 데이터가 제거되는 시간
            gcTime: QUERY_CONFIG.GC_TIME,
            // 재시도 로직
            retry: shouldRetryRequest,
            // 재시도 지연 시간
            retryDelay: calculateRetryDelay,
            // 윈도우 포커스 시 자동 리페치 설정
            refetchOnWindowFocus: QUERY_CONFIG.REFETCH_ON_WINDOW_FOCUS,
            // 인터넷 재연결 시 자동 리페치 설정
            refetchOnReconnect: QUERY_CONFIG.REFETCH_ON_RECONNECT,
        },
        mutations: {
            // mutation은 기본적으로 재시도 안함
            retry: false,
            // mutation 에러 시 전역 처리 (선택사항)
            onError: (error: AxiosError) => {
                if (import.meta.env.DEV) {
                    console.error('[Mutation Error]', error);
                }
            },
        },
    },
});

export default queryClient;
