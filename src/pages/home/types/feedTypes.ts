// 기사 피드 관련 타입 정의

// 피드 기사 정보
export interface ArticleInFeedDto {
    articleId: number;
    title: string;
    summary: string;
    publishedAt: string;
    imageUrl: string | null;
    viewCount: number;
    articleUrl: string;
    snackUrl: string;
    category: string;
}

// API 응답 구조 (Snack API 공통 응답)
export interface ApiResponse<T> {
    isSuccess: boolean;
    code: string;
    message: string;
    result?: T;
    error?: unknown;
}

// 메인 피드 API 응답
export interface MainFeedResponse {
    articles: ArticleInFeedDto[];
    lastArticleId: number | null;
    hasNext: boolean;
}

// 메인 피드 요청 파라미터
export interface MainFeedParams {
    category: string[];
    lastArticleId?: number;
}
