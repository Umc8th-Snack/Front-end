import api from '@/shared/apis/api';

export type CustomFeedArticle = {
    articleId: number;
    title: string;
    publishedAt: string;
    imageUrl: string | null;
    categories?: string[];
    category?: string | number | null;
};

export type CustomFeedResult = {
    hasNext: boolean;
    nextCursorId: number | null;
    articles: CustomFeedArticle[];
};

export const getCustomFeed = async (lastArticleId?: number) => {
    return api.get<CustomFeedResult>('/api/feeds/personalized', {
        params: lastArticleId ? { lastArticleId } : {},
    });
};
