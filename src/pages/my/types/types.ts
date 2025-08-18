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
