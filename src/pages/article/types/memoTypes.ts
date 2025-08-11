// API 응답 공통 구조
export interface ApiResponse<T> {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
    error: unknown;
}

// 메모 목록 조회 결과 타입
export interface MemosResult {
    memos: Memo[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
}

// 메모 기본 타입
export interface Memo {
    memoId: number;
    content: string;
    createdAt: string;
    articleId: number;
}

// 메모 생성 요청 타입
export interface CreateMemoRequest {
    content: string;
}

// 메모 수정 요청 타입
export interface UpdateMemoRequest {
    content: string;
}

// 메모 생성/수정 응답 타입
export interface MemoResponse {
    memoId: number;
    content: string;
}
