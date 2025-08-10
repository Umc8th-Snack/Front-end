import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchMainFeedArticles } from '../apis/feedApi';
import type { MainFeedResponse } from '../types/feedTypes';

interface UseMainFeedArticlesProps {
    categories: string[];
    enabled?: boolean;
}

/**
 * 메인 피드 기사 목록 조회 React Query 훅
 * 무한 스크롤을 지원하는 useInfiniteQuery 사용
 */
export const useMainFeedArticles = ({ categories, enabled = true }: UseMainFeedArticlesProps) => {
    return useInfiniteQuery<MainFeedResponse, Error>({
        queryKey: ['mainFeed', categories],
        queryFn: ({ pageParam }) => {
            return fetchMainFeedArticles({
                category: categories,
                lastArticleId: pageParam as number | undefined,
            });
        },
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
            // hasNext가 true이고 lastArticleId가 있으면 다음 페이지 존재
            return lastPage.hasNext && lastPage.lastArticleId ? lastPage.lastArticleId : undefined;
        },
        enabled: enabled && categories.length > 0, // 카테고리가 선택되어 있을 때만 실행
        staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
        gcTime: 1000 * 60 * 10, // 10분간 캐시 유지
    });
};
