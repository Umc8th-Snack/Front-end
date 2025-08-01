interface ArticleCardProps {
    title?: string;
    category?: '정치' | '금융' | '사회' | '세계' | '과학' | '문화' | '기타';
}

function ArticleCard({ title = 'article title', category = '기타' }: ArticleCardProps) {
    const truncatedTitle = title.length > 28 ? title.slice(0, 28) + '...' : title;

    return (
        <div
            className="relative h-[210px] w-[255px]"
            style={{ backgroundColor: '#0557E01A', borderRadius: '22px 8px 22px 8px' }}
        >
            {/* 카테고리 로고 */}
            <div className="absolute top-[21px] left-[21px]">
                <img
                    src={`/src/assets/ArticleCard/${category}.svg`}
                    alt={`${category} 로고`}
                    className="h-[50px] w-[50px]"
                />
            </div>

            {/* 기사 제목 */}
            <div className="absolute right-0 bottom-0 left-0 px-[33px] pb-[28px]">
                <div className="text-20px-medium text-black">{truncatedTitle}</div>
            </div>
        </div>
    );
}

export default ArticleCard;
