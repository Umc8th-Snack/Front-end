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

// 메모 목록 조회 응답 타입
export interface MemoListResponse {
    memos: Memo[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
}

// 메모 목록 조회 파라미터 타입
export interface MemoListParams {
    page?: number;
    size?: number;
}

// 메모 생성/수정 응답 타입
export interface MemoResponse {
    memoId: number;
    content: string;
}
