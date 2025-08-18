import { useQuery } from '@tanstack/react-query';

import { fetchScrapList } from '../apis/scrap';
import { MY_QUERY_KEYS } from '../constants/queryConstants';
import type { Scrap } from '../types/types';

type ScrapListResponse = {
    scraps: Scrap[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
};

export const useScraps = (page: number, size: number, enabled = true) => {
    return useQuery({
        queryKey: MY_QUERY_KEYS.SCRAPS(page, size),
        queryFn: async (): Promise<ScrapListResponse> => fetchScrapList(page, size),
        enabled,
        placeholderData: (prev) => prev,
        staleTime: 30_000,
        gcTime: 5 * 60_000,
    });
};
