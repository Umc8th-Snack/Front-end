export interface MainFeedParams {
    /** UI에서 선택한 카테고리 코드들  혹은 한글명들 혼용 허용 */
    categories: Array<string>;
    /** 다음 페이지 커서: 마지막으로 받은 기사 ID */
    lastArticleId?: number | null;
}

/** 서버 응답 형태 */
export interface MainFeedArticle {
    articleId: number;
    title: string;
    summary: string;
    publishedAt: string;
    imageUrl: string | null;
    category: string;
    hasNext?: boolean;
}

export interface MainFeedResult {
    articles: MainFeedArticle[];
    categories: string[];
    nextCursorId: number | null;
}

export interface MainFeedEnvelope {
    isSuccess: boolean;
    code: string;
    message: string;
    result: MainFeedResult;
}
