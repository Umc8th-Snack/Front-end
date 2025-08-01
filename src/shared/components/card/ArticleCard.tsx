interface ArticleCardProps {
    title?: string;
    category?: '정치' | '금융' | '사회' | '세계' | '과학' | '문화' | '기타';
}

function ArticleCard({ title = 'article title', category = '기타' }: ArticleCardProps) {
    return (
        <div className="relative flex w-[260px] flex-col items-center rounded-xl border border-gray-200 bg-white p-6">
            {/* 카테고리 로고 */}
            <div className="absolute top-[21px] left-[21px]">
                <img
                    src={`/src/assets/ArticleCard/${category}.svg`}
                    alt={`${category} 로고`}
                    className="h-[50px] w-[50px]"
                />
            </div>

            {/* 기사 제목 */}
            <div className="mt-[71px] w-full">
                <div className="text-20px-medium mb-2 overflow-hidden text-ellipsis whitespace-nowrap">{title}</div>
            </div>
        </div>
    );
}

export default ArticleCard;
