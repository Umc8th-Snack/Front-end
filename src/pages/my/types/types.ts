export type Memo = {
    memoId: number;
    content: string;
    createdAt: string;
    articleId: number;
    id: number;
    date: string;
};

export interface MemoListResponse {
    memos: Memo[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
}

export interface ScrapListResponse {
    scraps: Scrap[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
}
export type Scrap = {
    scrapId: number;
    articleId: number;
    title: string;
    summaryPreview: string;
    category: string;
    publishedAt: string;
};

//마이페이지 정보 조회
export interface UserProfile {
    userId: number;
    email: string;
    nickname: string;
    profileImage: string;
    introduction: string;
}

export type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

// 공통 응답 포맷
export interface ApiEnvelope<T> {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
    error?: unknown;
}

// 업로드 결과 타입 (Swagger 스펙)
export interface UploadProfileResult {
    fileName: string;
    fileUrl: string;
    originalFileName: string;
    fileSize: number;
}
