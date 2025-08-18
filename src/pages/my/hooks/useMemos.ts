import { useQuery } from '@tanstack/react-query';

import { fetchMemoList } from '../apis/memo';
import { MY_QUERY_KEYS } from '../constants/queryConstants';
import type { Memo } from '../types/types';

type MemoListResponse = {
    memos: Memo[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
};

export const useMemos = (page: number, size: number, enabled = true) => {
    return useQuery({
        queryKey: MY_QUERY_KEYS.MEMOS(page, size),
        queryFn: async (): Promise<MemoListResponse> => fetchMemoList(page, size),
        enabled,
        // 페이지 바뀔 때 이전 데이터 유지로 깜빡임 최소화
        placeholderData: (prev) => prev,
        staleTime: 30_000, // 30s
        gcTime: 5 * 60_000,
    });
};
