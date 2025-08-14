export type Memo = {
    memoId: number;
    content: string;
    createdAt: string;
    articleId: number;
    // 기존 호환성을 위한 별칭
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
export interface Scrap {
    scrapId: number;
    articleId: number;
    title: string;
    summaryPreview: string;
    category: string;
    publishedAt: string;
}

//마이페이지 정보 조회
export interface UserProfile {
    userId: number;
    email: string;
    nickname: string;
    profileImage: string;
    introduction: string;
}
