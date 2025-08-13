import type { RelatedArticle } from '@/pages/article/types/share';
import axiosInstance from '@/shared/apis/axios';

type RelatedArticlesEnvelope = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: RelatedArticle[];
    error: unknown;
};

export const getRelatedArticles = async (articleId: number): Promise<RelatedArticle[]> => {
    const res = await axiosInstance.get<RelatedArticlesEnvelope>(`/api/articles/${articleId}/related-articles`);
    return res.data.result;
};
