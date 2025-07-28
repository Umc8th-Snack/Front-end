import { useState } from 'react';

import TodayGreetingBanner from '@/shared/components/banner/TodayGreetingBanner';
import CategoryChips from '@/shared/components/chip/CategoryChips';

const HomePage = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const categories = ['정치', '경제', '사회', '국제', '스포츠', '연예', 'IT/과학'];

    const handleCategoryChange = (selected: string[]) => {
        setSelectedCategories(selected);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            {/* 인사말 배너 */}
            <div className="mb-8">
                <TodayGreetingBanner />
            </div>

            {/* 카테고리 선택 */}
            <div className="mx-auto max-w-[1121px] px-4">
                <h2 className="text-24px-semibold mb-4 text-black">관심 카테고리를 선택해주세요</h2>
                <CategoryChips
                    categories={categories}
                    initialSelected={selectedCategories}
                    onChange={handleCategoryChange}
                />
            </div>
        </div>
    );
};

export default HomePage;
