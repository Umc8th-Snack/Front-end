import axiosInstance from '@/shared/apis/axios';

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
    const res = await axiosInstance.get('/api/feeds/personalized', {
        params: lastArticleId ? { lastArticleId } : {},
    });
    return res.data.result as CustomFeedResult;
};
