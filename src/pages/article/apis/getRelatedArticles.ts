import type { RelatedArticle } from '@/pages/article/types/share';
import api from '@/shared/apis/api';

export const getRelatedArticles = async (articleId: number): Promise<RelatedArticle[]> => {
    return api.get<RelatedArticle[]>(`/api/articles/${articleId}/related-articles`);
};
