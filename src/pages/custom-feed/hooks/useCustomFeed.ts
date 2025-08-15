import { useInfiniteQuery } from '@tanstack/react-query';

import type { CustomFeedResult } from '../apis/customFeedApi';
import { getCustomFeed } from '../apis/customFeedApi';

interface UseCustomFeedProps {
    enabled?: boolean;
}

export const useCustomFeed = ({ enabled = true }: UseCustomFeedProps = {}) => {
    return useInfiniteQuery<CustomFeedResult, Error>({
        queryKey: ['customFeed'],
        queryFn: ({ pageParam }) => {
            console.log('useInfiniteQuery 실행 - customFeed pageParam:', pageParam);
            return getCustomFeed(pageParam as number | undefined);
        },
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => (lastPage.hasNext && lastPage.nextCursorId ? lastPage.nextCursorId : undefined),
        enabled,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};
