import axiosInstance from '@/shared/apis/axios';

export const reportTerm = (articleId: number) => axiosInstance.post(`/api/articles/${articleId}/reports/term`, {});
export const reportQuiz = (articleId: number) => axiosInstance.post(`/api/articles/${articleId}/reports/quiz`, {});
