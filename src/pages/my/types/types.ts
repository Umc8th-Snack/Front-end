export interface Memo {
    memoId: number;
    content: string;
    createdAt: string;
    articleUrl: string;
}

export interface MemoListResponse {
    memos: Memo[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
}

export type Scrap = {
    id: number;
    title: string;
    summary: string;
};

//마이페이지 정보 조회
export interface UserProfile {
    userId: number;
    email: string;
    nickname: string;
    profileUrl: string;
    introduction: string;
}
