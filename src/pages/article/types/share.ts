export interface SharedArticle {
    articleId: number;
    title: string;
    summary: string;
    publishedAt: string;
    originalUrl: string;
    category: string;
}

// 새로운 관련기사 API 응답 타입
export interface RelatedArticle {
    articleId: number;
    title: string;
    imageUrl: string;
}

// export interface RelatedArticlesResponse {
//     isSuccess: boolean;
//     code: string;
//     message: string;
//     result: RelatedArticle[];
//     error: Record<string, unknown>;
// }
export interface RelatedArticlesEnvelope {
    isSuccess: boolean;
    code: string;
    message: string;
    result: RelatedArticle[];
    error: unknown;
}
