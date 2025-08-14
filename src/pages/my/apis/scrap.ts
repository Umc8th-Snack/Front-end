import type { ScrapListResponse } from '@/pages/my/types/types';
import axiosInstance from '@/shared/apis/axios';

export const fetchScrapList = async (page = 1, size = 5): Promise<ScrapListResponse> => {
    const res = await axiosInstance.get('/api/scraps', {
        params: { page: page - 1, size }, // 서버가 0-based 페이지라면 -1
    });

    if (!res.data?.isSuccess) {
        throw new Error(res.data?.message ?? '스크랩 목록 조회 실패');
    }

    return res.data.result as ScrapListResponse;
};
