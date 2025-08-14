import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TodayGreetingBanner from '@/shared/components/banner/TodayGreetingBanner/TodayGreetingBanner/TodayGreetingBanner';
import ArticleCard from '@/shared/components/card/ArticleCard';
import OnboardingCard from '@/shared/components/card/OnboardingCard';
import CategoryChips from '@/shared/components/chip/CategoryChips';
import { API_FILTERABLE_CATEGORIES, DEFAULT_SELECTED_CATEGORIES } from '@/shared/constants/categoryConstants';

import { useMainFeedArticles } from './hooks/useMainFeedArticles';

const HomePage = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([...DEFAULT_SELECTED_CATEGORIES]);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    // API 호출 훅 사용
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useMainFeedArticles({
        categories: selectedCategories,
    });

    const handleCategoryChange = (selected: string[]) => {
        console.log('카테고리 변경:', selected);
        setSelectedCategories(selected);
    };

    // 카테고리 변경 시 API 호출 확인
    useEffect(() => {
        console.log('현재 선택된 카테고리:', selectedCategories);
        console.log('API 로딩 상태:', isLoading);
    }, [selectedCategories, isLoading]);

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

    // 무한 스크롤로 로드된 여러 페이지의 기사들을 하나의 배열로 평면화
    // 예: [{articles: [1,2]}, {articles: [3,4]}] → [1,2,3,4]
    const articles = data?.pages.flatMap((page) => page.articles) || [];

    return (
        <div className="min-h-screen py-8">
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
                    categories={[...API_FILTERABLE_CATEGORIES]}
                    selected={selectedCategories}
                    onChange={handleCategoryChange}
                />
            </div>

            {/* 기사 카드 그리드 */}
            <div className="mx-auto max-w-[1151px] px-4">
                {isLoading ? (
                    <div className="flex h-[400px] items-center justify-center">
                        <div className="text-24px-medium text-black-70">잠시만요, 스낵이 기사를 담는 중이에요…</div>
                    </div>
                ) : isError ? (
                    <div className="flex h-[400px] items-center justify-center">
                        <div className="text-24px-medium text-danger/70">
                            {error?.message || '앗, 뉴스를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.'}
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
                        <div className="grid grid-cols-3 justify-items-center gap-[33px] min-[1151px]:grid-cols-4">
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
                                        <ArticleCard title={article.title} imageUrl={article.imageUrl!.trim()} />
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
