import axiosInstance from './axios';

export const createShareLink = async (articleId: number) => {
    const response = await axiosInstance.post(`/api/articles/${articleId}/share`, null);
    return response.data.result.sharedUrl;
};
