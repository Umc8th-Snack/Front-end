import axiosInstance from '@/pages/my/apis/axios';
import type { MemoListResponse } from '@/pages/my/types/types';

export const fetchMemoList = async (page = 1, size = 5): Promise<MemoListResponse> => {
    const res = await axiosInstance.get('/api/memos', {
        params: { page: page - 1, size },
    });

    return res.data.result;
};
