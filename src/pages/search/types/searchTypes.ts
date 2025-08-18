export interface SemanticArticle {
    title: string;
    summary: string;
    score: number;
    keywords: string[] | null;
    article_id: number;
    published_at: string | null;
}

export interface SemanticSearchResult {
    query: string;
    totalCount: number;
    articles: SemanticArticle[];
}

export interface SemanticSearchResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: SemanticSearchResult;
    error: unknown | null;
}

export type SearchHistoryResponse = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: string[];
    error: unknown | null;
};
