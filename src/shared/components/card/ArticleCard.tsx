import cultureIcon from '@/shared/assets/article/culture.svg?react';
import ecomonyIcon from '@/shared/assets/article/ecomony.svg?react';
import etcIcon from '@/shared/assets/article/etc.svg?react';
import politicsIcon from '@/shared/assets/article/politics.svg?react';
import scienceIcon from '@/shared/assets/article/science.svg?react';
import societyIcon from '@/shared/assets/article/society.svg?react';
import worldIcon from '@/shared/assets/article/world.svg?react';

interface ArticleCardProps {
    title?: string;
    category?: string; // 기사 카테고리 (사회, 정치, 경제 등)
}

// 카테고리별 SVG 아이콘 컴포넌트
const CategoryIcon = ({ category }: { category?: string }) => {
    const SocietyIcon = societyIcon;
    const PoliticsIcon = politicsIcon;
    const EconomyIcon = ecomonyIcon;
    const ScienceIcon = scienceIcon;
    const CultureIcon = cultureIcon;
    const WorldIcon = worldIcon;
    const EtcIcon = etcIcon;

    // 카테고리별 아이콘 반환(임의로 한글로 설정했습니다! 추후 변동 필요)
    switch (category) {
        case '사회':
            return <SocietyIcon className="h-12 w-12" />;
        case '정치':
            return <PoliticsIcon className="h-12 w-12" />;
        case '경제':
            return <EconomyIcon className="h-12 w-12" />;
        case '과학':
            return <ScienceIcon className="h-12 w-12" />;
        case '문화':
            return <CultureIcon className="h-12 w-12" />;
        case '세계':
            return <WorldIcon className="h-12 w-12" />;
        case '기타':
            return <EtcIcon className="h-12 w-12" />;
        default:
            return <SocietyIcon className="h-12 w-12" />;
    }
};

function ArticleCard({ title = 'article title', category = '사회' }: ArticleCardProps) {
    return (
        <div className="bg-main-10 m-5 flex h-[220px] w-[210px] flex-col rounded-tl-[22px] rounded-tr-[8px] rounded-br-[22px] rounded-bl-[8px] p-6">
            {/* 카테고리 아이콘 */}
            <div className="mb-4 flex w-full justify-start">
                <CategoryIcon category={category} />
            </div>

            {/* 기사 제목 */}
            <div className="flex w-full flex-1 items-center">
                <div className="text-20px-medium line-clamp-3 overflow-hidden text-ellipsis">{title}</div>
            </div>
        </div>
    );
}

export default ArticleCard;
