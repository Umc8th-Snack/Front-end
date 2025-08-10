import { useEffect, useRef, useState } from 'react';

import TodayGreetingBanner from '@/shared/components/banner/TodayGreetingBanner/TodayGreetingBanner/TodayGreetingBanner';
import ArticleCard from '@/shared/components/card/ArticleCard';
import OnboardingCard from '@/shared/components/card/OnboardingCard';
import CategoryChips from '@/shared/components/chip/CategoryChips';
import {
    API_CATEGORIES,
    DEFAULT_SELECTED_CATEGORIES,
    mapApiCategoryToCardCategory,
} from '@/shared/constants/categoryConstants';

import { useMainFeedArticles } from './hooks/useMainFeedArticles';

const HomePage = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([...DEFAULT_SELECTED_CATEGORIES]);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    // API 호출 훅 사용
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useMainFeedArticles({
        categories: selectedCategories,
    });

    const handleCategoryChange = (selected: string[]) => {
        setSelectedCategories(selected);
    };

    // Intersection Observer 설정 (무한 스크롤)
    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    void fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    // 모든 페이지의 기사를 평면화
    const articles = data?.pages.flatMap((page) => page.articles) || [];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            {/* 인사말 배너 */}
            <div className="mb-[51px]">
                <TodayGreetingBanner />
            </div>

            {/* 온보딩 카드 */}
            <div className="mb-[67px] flex justify-center">
                <OnboardingCard />
            </div>

            {/* 카테고리 선택 */}
            <div className="mx-auto mb-12 max-w-[1121px]">
                <CategoryChips
                    categories={[...API_CATEGORIES]}
                    initialSelected={selectedCategories}
                    onChange={handleCategoryChange}
                />
            </div>

            {/* 기사 카드 그리드 */}
            <div className="mx-auto max-w-[1151px] px-4">
                {isLoading ? (
                    <div className="flex h-[400px] items-center justify-center">
                        <div className="text-gray-500">기사를 불러오는 중...</div>
                    </div>
                ) : isError ? (
                    <div className="flex h-[400px] items-center justify-center">
                        <div className="text-red-500">{error?.message || '기사를 불러오는데 실패했습니다.'}</div>
                    </div>
                ) : articles.length === 0 ? (
                    <div className="flex h-[400px] items-center justify-center">
                        <div className="text-gray-500">표시할 기사가 없습니다.</div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-3 justify-items-center gap-[33px] min-[1151px]:grid-cols-4">
                            {articles.map((article) => (
                                <ArticleCard
                                    key={article.articleId}
                                    title={article.title}
                                    category={mapApiCategoryToCardCategory(article.category)}
                                />
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
