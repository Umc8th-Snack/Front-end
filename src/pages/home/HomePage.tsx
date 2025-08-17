import { type InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchMainFeed } from '@/pages/home/apis/feedApi';
import { FEED_QUERY_KEY } from '@/pages/home/hooks/useMainFeedArticles';
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

    // ✅ 카테고리 미선택이면 enabled=false로 API 호출 자체를 막음
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
    });

    const handleCategoryChange = (selected: string[]) => {
        console.log('카테고리 변경:', selected);
        setSelectedCategories(selected);
    };

    useEffect(() => {
        if (isCategoryEmpty) return; // ✅ 미선택이면 로깅 스킵
        console.log('현재 선택된 카테고리:', selectedCategories);
        console.log('API 로딩 상태:', isLoading);
    }, [selectedCategories, isLoading, isCategoryEmpty]);

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        // ✅ 미선택이면 옵저버 설치 안 함
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

    //  중복 제거(첫 등장 순서 유지)
    const articles = useMemo<MainFeedArticle[]>(() => {
        if (isCategoryEmpty) return []; // ✅ 미선택이면 바로 빈 배열
        const seen = new Set<number>();
        const out: MainFeedArticle[] = [];

        // data는 InfiniteData<MainFeedResult> | undefined
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

    // ✅ 카테고리 미선택 상태: API 호출 없이 안내 문구만 렌더
    if (isCategoryEmpty) {
        return (
            <div className="min-h-screen py-8">
                {/* 인사말 배너 */}
                <div className="mx-auto mb-[51px] max-w-full sm:max-w-[800px] lg:max-w-[1121px]">
                    <TodayGreetingBanner />
                </div>

                {/* 온보딩 카드 */}
                <div className="mb-20 flex justify-center sm:mb-24 lg:mb-[67px]">
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

                {/* 안내 문구 */}
                <div className="mx-auto max-w-[1151px] px-4">
                    <div className="flex h-[200px] items-center justify-center">
                        <div className="text-24px-medium text-black-70 text-center leading-relaxed">
                            <span className="block">아직 선택한 카테고리가 없어요.😭</span>
                            <span className="block">관심 분야를 골라볼까요?</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 py-8">
            {/* 인사말 배너 */}
            <div className="mx-auto mb-[51px] max-w-full lg:max-w-[1121px]">
                <TodayGreetingBanner variant="home" />
            </div>

            {/* 온보딩 카드 */}
            <div className="mb-20 flex justify-center sm:mb-24 lg:mb-[67px]">
                <OnboardingCard />
            </div>

            {/* 카테고리 선택 */}
            <div className="mx-auto mb-6 max-w-[1121px] sm:mb-12">
                <CategoryChips
                    categories={[...API_FILTERABLE_CATEGORIES]}
                    selected={selectedCategories}
                    onChange={handleCategoryChange}
                />
            </div>

            {/* 기사 카드 그리드 */}
            <div className="mx-auto max-w-[1151px]">
                {isLoading ? (
                    <div className="flex h-[400px] items-center justify-center">
                        <div className="text-24px-medium text-black-70">잠시만요, 스낵이 기사를 담는 중이에요…</div>
                    </div>
                ) : isError ? (
                    <div className="flex h-[400px] items-center justify-center">
                        <div className="text-24px-medium text-danger/70">
                            {error instanceof Error
                                ? error.message
                                : '앗, 뉴스를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.'}
                        </div>
                    </div>
                ) : articles.length === 0 ? (
                    <div className="flex h-[200px] items-center justify-center">
                        <div className="text-24px-medium text-black-70 text-center leading-relaxed">
                            <span className="block">아직 선택한 카테고리가 없어요.😭</span>
                            <span className="block">관심 분야를 골라볼까요?</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {articles
                                .filter(
                                    (a) => typeof a.imageUrl === 'string' && /^https?:\/\//i.test(a.imageUrl.trim())
                                )
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
        </div>
    );
};

export default HomePage;
