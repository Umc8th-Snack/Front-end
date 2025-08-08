import axiosInstance from '@/shared/apis/axios';

// 스크랩 추가
export const addScrap = async (articleId: number): Promise<void> => {
    await axiosInstance.post(`/api/scraps/${articleId}`);
};

// 스크랩 취소
export const deleteScrap = async (articleId: number): Promise<void> => {
    await axiosInstance.delete(`/api/scraps/${articleId}`);
};
