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
import { useUserInfo } from '@/shared/hooks/useUser';

import type { CustomFeedArticle } from './apis/customFeedApi';
import CustomFeedBanner from './components/CustomFeedBanner';
import { useCustomFeed } from './hooks/useCustomFeed';

const CustomFeedPage = () => {
    const navigate = useNavigate();
    const { data: userInfo } = useUserInfo();
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
            <div className="min-h-[380px] px-4 py-8">
                <div className="mx-auto max-w-[1121px]">
                    {/* 맞춤 피드 시작 안내 배너 적용 */}
                    <CustomFeedBanner />
                </div>
            </div>
        );

    if (!items.length)
        return (
            <div className="min-h-[380px] px-4 py-8">
                <div className="mx-auto max-w-[1121px]">
                    {/* 맞춤 피드 시작 안내 배너 적용 */}
                    <CustomFeedBanner />
                </div>
            </div>
        );

    return (
        <div className="min-h-screen px-4 py-8">
            {/* 인사말 배너 */}
            <div className="mx-auto mb-[51px] max-w-full lg:max-w-[1121px]">
                <TodayGreetingBanner nickname={userInfo?.nickname || '스내커'} variant="custom-feed" />
            </div>

            {/* 온보딩 카드 */}
            <div className="mb-20 flex justify-center sm:mb-24 lg:mb-[67px]">
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
