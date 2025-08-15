import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import TodayGreetingBanner from '@/shared/components/banner/TodayGreetingBanner/TodayGreetingBanner/TodayGreetingBanner';
import ArticleCard from '@/shared/components/card/ArticleCard';
import OnboardingCard from '@/shared/components/card/OnboardingCard';
import {
    API_CATEGORIES,
    type ApiCategory,
    CATEGORY_CODE_TO_KO,
    mapApiCategoryToCardCategory,
} from '@/shared/constants/categoryConstants';

import type { CustomFeedArticle } from './apis/customFeedApi';
import { useCustomFeed } from './hooks/useCustomFeed';

const CustomFeedPage = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useCustomFeed({
        enabled: true,
    });
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!loadMoreRef.current) return;
        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
                }
            },
            { rootMargin: '400px 0px' }
        );
        io.observe(loadMoreRef.current);
        return () => io.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const items = useMemo(() => (data?.pages ?? []).flatMap((p) => p.articles), [data]);

    if (isLoading)
        return (
            <div className="mx-auto flex h-[400px] max-w-[1121px] items-center justify-center">
                <div className="text-black/60">맞춤 뉴스를 담는 중이에요…</div>
            </div>
        );

    if (isError)
        return (
            <div className="mx-auto flex h-[400px] max-w-[1121px] items-center justify-center">
                <div className="text-red-500">맞춤 피드를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</div>
            </div>
        );

    if (!items.length)
        return (
            <div className="mx-auto flex h-[400px] max-w-[1121px] items-center justify-center">
                <div className="text-black/60">아직 보여드릴 맞춤 뉴스가 없어요.</div>
            </div>
        );

    return (
        <div className="min-h-screen px-4 py-8">
            {/* 인사말 배너 */}
            <div className="mb-[51px]">
                <TodayGreetingBanner nickname="스내커" />
            </div>

            {/* 온보딩 카드 */}
            <div className="mb-[67px] flex justify-center">
                <OnboardingCard />
            </div>

            <div className="mx-auto max-w-[1151px]">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {items.map((article: CustomFeedArticle) => {
                        const raw =
                            Array.isArray(article.categories) && article.categories.length
                                ? article.categories[0]
                                : (article.category ?? '기타');

                        const s = String(raw ?? '').trim();
                        const ko: ApiCategory = /^\d{3}$/.test(s)
                            ? (CATEGORY_CODE_TO_KO[s as keyof typeof CATEGORY_CODE_TO_KO] ?? '기타')
                            : (API_CATEGORIES as readonly string[]).includes(s as ApiCategory)
                              ? (s as ApiCategory)
                              : '기타';

                        const cardCategory = mapApiCategoryToCardCategory(ko);
                        const url =
                            article.imageUrl && /^https?:\/\//i.test(article.imageUrl.trim())
                                ? article.imageUrl.trim()
                                : undefined;

                        if (!url) return null;

                        return (
                            <button
                                key={article.articleId}
                                onClick={() => void navigate(`/articles/${article.articleId}`)}
                                className="cursor-pointer text-left"
                            >
                                <ArticleCard title={article.title} category={cardCategory} imageUrl={url} size="main" />
                            </button>
                        );
                    })}
                </div>
            </div>

            <div ref={loadMoreRef} className="h-10 w-full" />
            {isFetchingNextPage && (
                <div className="mt-6 flex items-center justify-center">
                    <div className="text-black/60">더 불러오는 중…</div>
                </div>
            )}
        </div>
    );
};

export default CustomFeedPage;
