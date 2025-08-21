import type { MemoListResponse } from '@/pages/my/types/types';
import api from '@/shared/apis/api';

export const fetchMemoList = async (page = 1, size = 5): Promise<MemoListResponse> => {
    return api.get<MemoListResponse>('/api/memos', {
        params: { page: page - 1, size }, // 서버가 0-based 페이지라면 -1
    });
};
