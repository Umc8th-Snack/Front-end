import { QueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

// tanstack-query 전역 에러 타입 등록
declare module '@tanstack/react-query' {
    interface Register {
        defaultError: AxiosError;
    }
}

// 상수 정의
const MAX_RETRY_COUNT = 2;
const STALE_TIME = 5 * 60 * 1000; // 5분
const GC_TIME = 30 * 60 * 1000; // 30분 (v5에서는 gcTime으로 변경됨)

// 재시도 여부 판단 함수
const shouldRetryRequest = (failureCount: number, error: AxiosError): boolean => {
    // 최대 재시도 횟수 초과 시 재시도 안함
    if (failureCount >= MAX_RETRY_COUNT) return false;

    // 네트워크 에러이거나 5xx 서버 에러인 경우만 재시도
    if (!error.response) return true; // 네트워크 에러
    return error.response.status >= 500;
};

// QueryClient 생성 및 설정
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // 데이터가 신선하게 유지되는 시간
            staleTime: STALE_TIME,
            // 캐시에서 데이터가 제거되는 시간
            gcTime: GC_TIME,
            // 재시도 로직
            retry: shouldRetryRequest,
            // 재시도 지연 시간 (exponential backoff)
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            // 윈도우 포커스 시 자동 리페치 비활성화
            refetchOnWindowFocus: false,
            // 인터넷 재연결 시 자동 리페치
            refetchOnReconnect: true,
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
