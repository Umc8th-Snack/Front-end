import type { SearchHistoryResponse } from '@/pages/search/types/searchTypes';

import axiosInstance from '../../../shared/apis/axios';

export const getSearchHistory = async (): Promise<string[]> => {
    const { data } = await axiosInstance.get<SearchHistoryResponse>('/api/search/history');
    return data.result ?? [];
};

export const addSearchHistory = async (query: string) => {
    await axiosInstance.post('/api/search/history', { query });
};
