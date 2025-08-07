import axiosInstance from '@/pages/my/apis/axios';
import type { ScrapListResponse } from '@/pages/my/types/types';

export const fetchScrapList = async (page = 1, size = 5): Promise<ScrapListResponse> => {
    const res = await axiosInstance.get('/api/scraps', {
        params: { page: page - 1, size },
    });

    return res.data.result;
};
