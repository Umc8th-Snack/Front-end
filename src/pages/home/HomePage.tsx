import { type InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMainFeedArticles } from '@/pages/home/hooks/useMainFeedArticles';
import type { MainFeedArticle } from '@/pages/home/types/feedTypes';
import TodayGreetingBanner from '@/shared/components/banner/TodayGreetingBanner/TodayGreetingBanner/TodayGreetingBanner';
import ArticleCard from '@/shared/components/card/ArticleCard';
import OnboardingCard from '@/shared/components/card/OnboardingCard';
import CategoryChips from '@/shared/components/chip/CategoryChips';
import { API_FILTERABLE_CATEGORIES, DEFAULT_SELECTED_CATEGORIES } from '@/shared/constants/categoryConstants';

const HomePage = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([...DEFAULT_SELECTED_CATEGORIES]);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useMainFeedArticles({
        categories: selectedCategories,
    });

    const handleCategoryChange = (selected: string[]) => {
        console.log('카테고리 변경:', selected);
        // 이전 쿼리 취소하여 중복 요청 방지
        void queryClient.cancelQueries({ queryKey: ['main-feed'] });
        setSelectedCategories(selected);
    };

    useEffect(() => {
        console.log('현재 선택된 카테고리:', selectedCategories);
        console.log('API 로딩 상태:', isLoading);

        // 원본 데이터 확인 (필터링 전)
        if (data?.pages) {
            const allArticles = data.pages.flatMap((p) => p.articles);
            const withImage = allArticles.filter((a) => a.imageUrl);
            const withoutImage = allArticles.filter((a) => !a.imageUrl);

            console.log('=== 서버 응답 분석 ===');
            console.log('전체 기사 수:', allArticles.length);
            console.log('imageUrl 있음:', withImage.length);
            console.log('imageUrl 없음:', withoutImage.length);
            console.log(
                'imageUrl 샘플 (처음 3개):',
                withImage.slice(0, 3).map((a) => ({
                    title: a.title,
                    imageUrl: a.imageUrl,
                    category: a.category,
                }))
            );
        }
    }, [selectedCategories, isLoading, data]);

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    console.log('🔍 [무한스크롤] 트리거 감지:', {
                        hasNextPage,
                        isFetchingNextPage,
                        shouldFetch: hasNextPage && !isFetchingNextPage,
                    });
                    if (hasNextPage && !isFetchingNextPage) {
                        void fetchNextPage();
                    }
                }
            },
            {
                threshold: 0.1,
                rootMargin: '100px', // 뷰포트 하단 100px 전에 미리 감지
            }
        );

        if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);

        return () => {
            observerRef.current?.disconnect();
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]); // selectedCategories 제거하여 불필요한 Observer 재생성 방지

    //  중복 제거(첫 등장 순서 유지)
    const articles = useMemo<MainFeedArticle[]>(() => {
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
    }, [data]);

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
