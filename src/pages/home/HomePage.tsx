import { useState } from 'react';

import TodayGreetingBanner from '@/shared/components/banner/TodayGreetingBanner';
import ArticleCard from '@/shared/components/card/ArticleCard';
import OnboardingCard from '@/shared/components/card/OnboardingCard';
import CategoryChips from '@/shared/components/chip/CategoryChips';

const HomePage = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const categories = ['정치', '경제', '사회', '국제', '스포츠', '연예', 'IT/과학'];

    const articleData = [
        { title: '국토부, 오산 옹벽붕괴 사고 조사위원회 구성 국토부 기사 제목', category: '금융' as const },
        { title: '국토부, 오산 옹벽붕괴 사고 조사위원회 구성 국토부 기사 제목', category: '과학' as const },
        { title: '국토부, 오산 옹벽붕괴 사고 조사위원회 구성 국토부 기사 제목', category: '문화' as const },
        { title: '국토부, 오산 옹벽붕괴 사고 조사위원회 구성 국토부 기사 제목', category: '문화' as const },
        { title: '국토부, 오산 옹벽붕괴 사고 조사위원회 구성 국토부 기사 제목', category: '세계' as const },
    ];

    const handleCategoryChange = (selected: string[]) => {
        setSelectedCategories(selected);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            {/* 인사말 배너 */}
            <div className="mb-8">
                <TodayGreetingBanner />
            </div>

            {/* 온보딩 카드 */}
            <div className="mb-8 flex justify-center">
                <OnboardingCard />
            </div>

            {/* 카테고리 선택 */}
            <div className="mx-auto mb-12 max-w-[1121px] px-4">
                <CategoryChips
                    categories={categories}
                    initialSelected={selectedCategories}
                    onChange={handleCategoryChange}
                />
            </div>

            {/* 기사 카드 그리드 */}
            <div className="mx-auto max-w-[1121px] px-4">
                <div className="grid grid-cols-1 justify-items-center gap-[33px] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {articleData.map((article, index) => (
                        <ArticleCard key={index} title={article.title} category={article.category} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
