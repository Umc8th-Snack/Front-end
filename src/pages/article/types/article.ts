export interface ArticleDetail {
    articleId: number;
    title: string;
    summary: string;
    publishedAt: string;
    imageUrl: string | null;
    viewCount: number | null;
    articleUrl: string;
    snackUrl: string;
    category: string;
}
