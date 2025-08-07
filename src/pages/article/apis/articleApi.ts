import type { ArticleDetail } from '@/pages/article/types/article';

import axiosInstance from '../../../shared/apis/axios';

export const getArticleDetail = async (articleId: number): Promise<ArticleDetail> => {
    const response = await axiosInstance.get(`/api/articles/${articleId}`);
    return response.data.result;
};
