import { useInfiniteQuery, type UseInfiniteQueryResult } from '@tanstack/react-query';

import type { MainFeedResult } from '@/pages/home/types/feedTypes';

import { fetchMainFeed } from '../apis/feedApi';

export const FEED_QUERY_KEY = (categories: string[]) => ['main-feed', ...categories] as const;

type PageParam = number | null;

export const useMainFeedArticles = (opts: { categories: string[] }): UseInfiniteQueryResult<MainFeedResult, Error> => {
    const { categories } = opts;

    return useInfiniteQuery<
        MainFeedResult, // TData
        Error, // TError
        MainFeedResult, // TQueryFnData
        ReturnType<typeof FEED_QUERY_KEY>, // TQueryKey
        PageParam // TPageParam
    >({
        queryKey: FEED_QUERY_KEY(categories),
        initialPageParam: null,
        queryFn: ({ pageParam }) =>
            fetchMainFeed({
                categories,
                lastArticleId: pageParam ?? null,
            }),
        // 다음 페이지 없으면 undefined로 종료
        getNextPageParam: (lastPage) => lastPage.nextCursorId ?? undefined,
        staleTime: 60 * 1000,
    });
};
