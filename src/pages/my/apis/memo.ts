import type { MemoListResponse } from '@/pages/my/types/types';
import axiosInstance from '@/shared/apis/axios';

export const fetchMemoList = async (page = 1, size = 5): Promise<MemoListResponse> => {
    const res = await axiosInstance.get('/api/memos', {
        params: { page: page - 1, size }, // 서버가 0-based 페이지라면 -1
    });

    if (!res.data?.isSuccess) {
        throw new Error(res.data?.message ?? '메모 목록 조회 실패');
    }

    return res.data.result as MemoListResponse;
};
