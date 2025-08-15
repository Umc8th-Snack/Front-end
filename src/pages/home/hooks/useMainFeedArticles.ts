import { useInfiniteQuery, type UseInfiniteQueryResult } from '@tanstack/react-query';

import type { MainFeedResult } from '@/pages/home/types/feedTypes';

import { fetchMainFeed } from '../apis/feedApi';

// 카테고리 순서와 무관하게 일관된 캐시 키 생성
export const FEED_QUERY_KEY = (categories: string[]) => {
    // null/undefined 방어 및 빈 배열 처리
    if (!categories || categories.length === 0) {
        return ['main-feed', 'all'] as const;
    }

    // 중복 제거 및 정렬로 순서에 무관한 키 생성
    const uniqueSorted = [...new Set(categories)].sort();
    const categoryKey = uniqueSorted.join(',');

    // 개발 환경에서 캐시 키 생성 로그
    if (process.env.NODE_ENV === 'development') {
        console.log('[Cache Key] 입력:', categories, '→ 정규화:', categoryKey);
    }

    return ['main-feed', categoryKey] as const;
};

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
