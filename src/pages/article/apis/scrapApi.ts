import axiosInstance from '@/shared/apis/axios';

export const addScrap = async (articleId: number): Promise<void> => {
    await axiosInstance.post(`/api/scraps/${articleId}`);
};
