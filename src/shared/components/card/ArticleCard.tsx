import cultureIcon from '@/shared/assets/article/culture.svg?react';
import ecomonyIcon from '@/shared/assets/article/ecomony.svg?react';
import etcIcon from '@/shared/assets/article/etc.svg?react';
import politicsIcon from '@/shared/assets/article/politics.svg?react';
import scienceIcon from '@/shared/assets/article/science.svg?react';
import societyIcon from '@/shared/assets/article/society.svg?react';
import worldIcon from '@/shared/assets/article/world.svg?react';

interface ArticleCardProps {
    title?: string;
    category?: '정치' | '금융' | '사회' | '세계' | '과학' | '문화' | '기타';
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

    // 카테고리별 아이콘 반환
    switch (category) {
        case '사회':
            return <SocietyIcon className="h-[50px] w-[50px]" />;
        case '정치':
            return <PoliticsIcon className="h-[50px] w-[50px]" />;
        case '경제':
        case '금융':
            return <EconomyIcon className="h-[50px] w-[50px]" />;
        case '과학':
            return <ScienceIcon className="h-[50px] w-[50px]" />;
        case '문화':
            return <CultureIcon className="h-[50px] w-[50px]" />;
        case '세계':
            return <WorldIcon className="h-[50px] w-[50px]" />;
        case '기타':
            return <EtcIcon className="h-[50px] w-[50px]" />;
        default:
            return <EtcIcon className="h-[50px] w-[50px]" />;
    }
};

function ArticleCard({ title = 'article title', category = '기타' }: ArticleCardProps) {
    const truncatedTitle = title.length > 28 ? title.slice(0, 28) + '...' : title;

    return (
        <div
            className="relative h-[210px] w-[255px]"
            style={{ backgroundColor: '#0557E01A', borderRadius: '22px 8px 22px 8px' }}
        >
            {/* 카테고리 로고 */}
            <div className="absolute top-[21px] left-[21px]">
                <CategoryIcon category={category} />
            </div>

            {/* 기사 제목 */}
            <div className="absolute right-0 bottom-0 left-0 px-[33px] pb-[28px]">
                <div className="text-20px-medium text-black">{truncatedTitle}</div>
            </div>
        </div>
    );
}

export default ArticleCard;
