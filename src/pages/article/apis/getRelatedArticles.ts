import type { RelatedArticle, RelatedArticlesResponse } from '@/pages/article/types/share';
import api from '@/shared/apis/api';

export const getRelatedArticles = async (articleId: number): Promise<RelatedArticle[]> => {
    const response = await api.get<RelatedArticlesResponse>(`/api/articles/${articleId}/related-articles`);
    return response.result;
};
