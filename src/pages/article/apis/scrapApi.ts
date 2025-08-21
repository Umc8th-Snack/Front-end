import api from '@/shared/apis/api';

export const getScrapExists = async (articleId: number): Promise<{ scrapped: boolean }> => {
    return api.get<{ scrapped: boolean }>(`/api/scraps/${articleId}/exists`);
};

// 스크랩 추가
export const addScrap = async (articleId: number): Promise<void> => {
    return api.post<void>(`/api/scraps/${articleId}`);
};

// 스크랩 취소
export const deleteScrap = async (articleId: number): Promise<void> => {
    return api.delete<void>(`/api/scraps/${articleId}`);
};
