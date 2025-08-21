import type { SemanticSearchResponse } from '@/pages/search/types/searchTypes';
import api from '@/shared/apis/api';

export async function semanticSearch(params: {
    query: string;
    page?: number;
    size?: number;
    threshold?: number;
}): Promise<SemanticSearchResponse['result']> {
    const { query, page = 0, size = 10, threshold = 0.7 } = params;
    return api.get<SemanticSearchResponse['result']>('/api/articles/search', {
        params: { query, page, size, threshold },
    });
}
