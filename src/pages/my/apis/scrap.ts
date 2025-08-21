import type { ScrapListResponse } from '@/pages/my/types/types';
import api from '@/shared/apis/api';

export const fetchScrapList = async (page = 1, size = 5): Promise<ScrapListResponse> => {
    return api.get<ScrapListResponse>('/api/scraps', {
        params: { page: page - 1, size }, // 서버가 0-based 페이지라면 -1
    });
};
