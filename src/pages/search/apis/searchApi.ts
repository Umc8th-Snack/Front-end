import type { SemanticSearchResponse } from '@/pages/search/types/searchTypes';

import axiosInstance from '../../../shared/apis/axios';

export async function semanticSearch(params: {
    query: string;
    page?: number;
    size?: number;
    threshold?: number;
}): Promise<SemanticSearchResponse['result']> {
    const { query, page = 0, size = 10, threshold = 0.7 } = params;
    const { data } = await axiosInstance.get<SemanticSearchResponse>('/api/articles/search', {
        params: { query, page, size, threshold },
    });
    return data.result;
}
