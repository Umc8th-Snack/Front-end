import type { GlossaryItem } from '@/pages/article/types/accordionTypes';
import api from '@/shared/apis/api';

export const getArticleTerms = async (articleId: number): Promise<GlossaryItem[]> => {
    return api.get<GlossaryItem[]>(`/api/articles/${articleId}/terms`);
};
