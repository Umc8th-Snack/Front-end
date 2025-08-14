import type { GlossaryItem } from '@/pages/article/types/accordionTypes';

import axiosInstance from '../../../shared/apis/axios';

export const getArticleTerms = async (articleId: number): Promise<GlossaryItem[]> => {
    const response = await axiosInstance.get(`/api/articles/${articleId}/terms`);
    return response.data.result;
};
