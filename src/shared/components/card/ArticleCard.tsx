interface ArticleCardProps {
    title?: string;
    category?: string; // 기사 카테고리 (사회, 정치, 경제 등)
    imageUrl?: string; // 기사 이미지 URL
}

function ArticleCard({ title = 'article title', imageUrl }: ArticleCardProps) {
    return (
        <div className="bg-main-10 m-5 flex h-[220px] w-[210px] flex-col rounded-tl-[22px] rounded-tr-[8px] rounded-br-[22px] rounded-bl-[8px] p-6">
            {/* 카테고리 아이콘 또는 이미지 */}
            <div className="mb-4 flex w-full justify-start">
                <img src={imageUrl} alt={title} className="h-12 w-12 rounded-lg object-cover" />
            </div>

            {/* 기사 제목 */}
            <div className="flex w-full flex-1 items-center">
                <div className="text-20px-medium line-clamp-3 overflow-hidden text-ellipsis">{title}</div>
            </div>
        </div>
    );
}

export default ArticleCard;
