import type { ArticleDetail } from '@/pages/article/types/article';
import api from '@/shared/apis/api';

export const getArticleDetail = async (articleId: number): Promise<ArticleDetail> => {
    return api.get<ArticleDetail>(`/api/articles/${articleId}`);
};
