import axiosInstance from '@/shared/apis/axios';

export const getScrapExists = (articleId: number) =>
    axiosInstance.get<{ result: { scrapped: boolean } }>(`/api/scraps/${articleId}/exists`);

// 스크랩 추가
export const addScrap = (articleId: number) =>
    axiosInstance.post(`/api/scraps/${articleId}`, null, {
        validateStatus: (s) => s < 500,
    });

// 스크랩 취소
export const deleteScrap = async (articleId: number): Promise<void> => {
    await axiosInstance.delete(`/api/scraps/${articleId}`);
};
