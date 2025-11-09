import { type InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchMainFeed } from '@/pages/home/apis/feedApi';
import { FEED_QUERY_KEY } from '@/pages/home/hooks/useMainFeedArticles';
import useServiceClosurePopup from '@/pages/home/hooks/useServiceClosurePopup';
import type { MainFeedArticle, MainFeedResult } from '@/pages/home/types/feedTypes';
import TodayGreetingBanner from '@/shared/components/banner/TodayGreetingBanner/TodayGreetingBanner/TodayGreetingBanner';
import ArticleCard from '@/shared/components/card/ArticleCard';
import OnboardingCard from '@/shared/components/card/OnboardingCard';
import CategoryChips from '@/shared/components/chip/CategoryChips';
import { API_FILTERABLE_CATEGORIES, DEFAULT_SELECTED_CATEGORIES } from '@/shared/constants/categoryConstants';

type PageParam = number | null;

const HomePage = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([...DEFAULT_SELECTED_CATEGORIES]);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const isCategoryEmpty = selectedCategories.length === 0;
    const { serviceClosureModal } = useServiceClosurePopup();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery<
        MainFeedResult, // TData
        Error, // TError
        MainFeedResult, // TQueryFnData
        ReturnType<typeof FEED_QUERY_KEY>, // TQueryKey
        PageParam // TPageParam
    >({
        queryKey: FEED_QUERY_KEY(selectedCategories),
        initialPageParam: null,
        enabled: !isCategoryEmpty,
        queryFn: ({ pageParam }) =>
            fetchMainFeed({
                categories: selectedCategories,
                lastArticleId: pageParam ?? null,
            }),
        getNextPageParam: (lastPage) => lastPage.nextCursorId ?? undefined,
        staleTime: 60 * 1000,
        placeholderData: (previousData) => previousData,
    });

    const handleCategoryChange = (selected: string[]) => {
        setSelectedCategories(selected);
    };

    useEffect(() => {
        if (isCategoryEmpty) return;
    }, [selectedCategories, isLoading, isCategoryEmpty]);

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        if (isCategoryEmpty) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    void fetchNextPage();
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);

        return () => {
            observerRef.current?.disconnect();
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage, isCategoryEmpty]);

    const articles = useMemo<MainFeedArticle[]>(() => {
        if (isCategoryEmpty) return [];
        const seen = new Set<number>();
        const out: MainFeedArticle[] = [];

        const infinite = data as
            | InfiniteData<{ articles: MainFeedArticle[]; categories: string[]; nextCursorId: number | null }>
            | undefined;

        infinite?.pages.forEach((page) => {
            page.articles.forEach((a) => {
                if (!seen.has(a.articleId)) {
                    seen.add(a.articleId);
                    out.push(a);
                }
            });
        });

        return out;
    }, [data, isCategoryEmpty]);

    const hasArticles = articles.length > 0;
    const isInitialLoading = isLoading && !hasArticles;

    const heroSection = (
        <>
            {/* 인사말 배너 */}
            <div className="mx-auto mb-[51px] max-w-full lg:max-w-[1121px]">
                <TodayGreetingBanner variant="home" />
            </div>

            {/* 온보딩 카드 */}
            <div className="mb-20 sm:mb-24 lg:mb-[67px]">
                <OnboardingCard />
            </div>

            {/* 카테고리 선택 */}
            <div className="mx-auto mb-6 max-w-[1121px] px-4 sm:mb-12">
                <CategoryChips
                    categories={[...API_FILTERABLE_CATEGORIES]}
                    selected={selectedCategories}
                    onChange={handleCategoryChange}
                />
            </div>
        </>
    );

    const emptyState = (
        <div className="mx-auto max-w-[1151px] px-4">
            <div className="flex h-[200px] items-center justify-center">
                <div className="text-24px-medium text-black-70 text-center leading-relaxed">
                    <span className="block">아직 선택한 카테고리가 없어요.</span>
                    <span className="block">관심 분야를 골라볼까요?</span>
                </div>
            </div>
        </div>
    );

    const feedContent = (
        <div className="mx-auto max-w-[1151px]">
            {isInitialLoading ? (
                <div className="flex h-[400px] items-center justify-center">
                    <div className="text-24px-medium text-black-70">잠시만요, 스낵의 기사를 모으는 중이에요!</div>
                </div>
            ) : isError && !hasArticles ? (
                <div className="flex h-[400px] items-center justify-center">
                    <div className="text-24px-medium text-danger/70">
                        {error instanceof Error
                            ? error.message
                            : '앗, 게시글을 불러오지 못했어요. 잠시 후 다시 시도해주세요.'}
                    </div>
                </div>
            ) : !hasArticles ? (
                <div className="flex h-[200px] items-center justify-center">
                    <div className="text-24px-medium text-black-70 text-center leading-relaxed">
                        <span className="block">아직 선택한 카테고리가 없어요.</span>
                        <span className="block">관심 분야를 골라볼까요?</span>
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {articles
                            .filter((a) => typeof a.imageUrl === 'string' && /^https?:\/\//i.test(a.imageUrl.trim()))
                            .map((article) => (
                                <button
                                    key={article.articleId}
                                    onClick={() => void navigate(`/articles/${article.articleId}`)}
                                    className="cursor-pointer text-left"
                                >
                                    <ArticleCard
                                        title={article.title}
                                        imageUrl={article.imageUrl!.trim()}
                                        category={article.category}
                                        size="main"
                                    />
                                </button>
                            ))}
                    </div>

                    {/* 무한 스크롤 트리거 */}
                    <div ref={loadMoreRef} className="mt-8 h-10">
                        {isFetchingNextPage && (
                            <div className="flex items-center justify-center">
                                <div className="text-gray-500">더 많은 기사를 불러오는 중...</div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );

    return (
        <>
            {serviceClosureModal}
            <div className="min-h-screen px-4 py-8">
                {heroSection}
                {isCategoryEmpty ? emptyState : feedContent}
            </div>
        </>
    );
};

export default HomePage;
