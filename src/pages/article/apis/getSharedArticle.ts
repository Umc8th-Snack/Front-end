import type { SharedArticle } from '@/pages/article/types/share';
import axiosInstance from '@/shared/apis/axios';

type ShareEnvelope = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: SharedArticle;
    error: unknown;
};

export const getSharedArticle = async (uuid: string): Promise<SharedArticle> => {
    const res = await axiosInstance.get<ShareEnvelope>(`/api/share/${uuid}`);
    return res.data.result;
};
