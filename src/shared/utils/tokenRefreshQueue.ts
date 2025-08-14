import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

/**
 * 토큰 재발급 큐잉 시스템
 * - 동시에 여러 요청이 401 에러를 받았을 때 중복 재발급 방지
 * - 첫 번째 요청만 재발급을 수행하고, 나머지는 대기
 */
class TokenRefreshQueue {
    private isRefreshing = false;
    private failedQueue: Array<{
        resolve: (value: InternalAxiosRequestConfig) => void;
        reject: (error: AxiosError) => void;
        originalRequest: InternalAxiosRequestConfig;
    }> = [];

    /**
     * 토큰 재발급 중인지 확인
     */
    getIsRefreshing(): boolean {
        return this.isRefreshing;
    }

    /**
     * 토큰 재발급 시작
     */
    startRefreshing(): void {
        console.log('🔄 [TOKEN QUEUE] 토큰 재발급 시작');
        this.isRefreshing = true;
    }

    /**
     * 토큰 재발급 완료
     */
    stopRefreshing(): void {
        console.log('✅ [TOKEN QUEUE] 토큰 재발급 완료');
        this.isRefreshing = false;
    }

    /**
     * 대기열에 요청 추가
     */
    addToQueue(request: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
        console.log('📋 [TOKEN QUEUE] 요청을 대기열에 추가:', request.url);

        return new Promise((resolve, reject) => {
            this.failedQueue.push({ resolve, reject, originalRequest: request });
        });
    }

    /**
     * 대기열의 모든 요청 처리 (재발급 성공 시)
     */
    processQueue(token: string): void {
        console.log(`✅ [TOKEN QUEUE] 대기열 처리 시작 (${this.failedQueue.length}개 요청)`);

        this.failedQueue.forEach(({ resolve, originalRequest }, index) => {
            console.log(`  - 요청 ${index + 1} 처리 중...`);
            // 원본 요청의 config를 유지하면서 새 토큰으로 헤더 업데이트
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(originalRequest);
        });

        this.clearQueue();
        console.log('✅ [TOKEN QUEUE] 대기열 처리 완료');
    }

    /**
     * 대기열의 모든 요청 거부 (재발급 실패 시)
     */
    rejectQueue(error: AxiosError): void {
        console.log(`❌ [TOKEN QUEUE] 대기열 거부 (${this.failedQueue.length}개 요청)`);

        this.failedQueue.forEach(({ reject }) => {
            reject(error);
        });

        this.clearQueue();
    }

    /**
     * 대기열 초기화
     */
    clearQueue(): void {
        this.failedQueue = [];
        console.log('🧹 [TOKEN QUEUE] 대기열 초기화');
    }

    /**
     * 큐 상태 리셋 (로그아웃 시 등)
     */
    reset(): void {
        this.isRefreshing = false;
        this.clearQueue();
        console.log('🔄 [TOKEN QUEUE] 큐 시스템 리셋');
    }
}

// 싱글톤 인스턴스
export const tokenRefreshQueue = new TokenRefreshQueue();
