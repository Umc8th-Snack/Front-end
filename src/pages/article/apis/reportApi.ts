import api from '@/shared/apis/api';

export const reportTerm = (articleId: number) => api.post<void>(`/api/articles/${articleId}/reports/term`, {});
export const reportQuiz = (articleId: number) => api.post<void>(`/api/articles/${articleId}/reports/quiz`, {});
