import type { SharedArticle } from '@/pages/article/types/share';
import api from '@/shared/apis/api';

export const getSharedArticle = async (uuid: string): Promise<SharedArticle> => {
    return api.get<SharedArticle>(`/api/share/${uuid}`);
};
