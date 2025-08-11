export type Memo = {
    memoId: number;
    content: string;
    createdAt: string;
    articleId: number;
    // 기존 호환성을 위한 별칭
    id: number;
    date: string;
};

export type Scrap = {
    id: number;
    title: string;
    summary: string;
};
