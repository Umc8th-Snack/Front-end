interface ArticleCardProps {
    title?: string;
    category?: string; // 기사 카테고리 (사회, 정치, 경제 등)
    imageUrl?: string; // 기사 이미지 URL
    size?: 'main' | 'sidebar'; // 카드 크기 옵션
}

function ArticleCard({ title = 'article title', imageUrl, size = 'sidebar' }: ArticleCardProps) {
    // 크기에 따른 스타일 클래스
    const sizeClasses = {
        main: 'h-[210px] w-[255px] p-6 m-2 text-20px-medium ', // 메인 페이지용 - 더 큰 크기, 작은 margin
        sidebar: 'h-[168px] w-[204px] p-6 m-5 text-16px-medium ', // sidebar용 - 기존 크기, 기존 margin
    };

    const imageSizeClasses = {
        main: 'h-12 w-12', // 메인 페이지용 - 더 큰 이미지
        sidebar: 'h-9 w-9', // sidebar용 - 기존 이미지 크기
    };

    return (
        <div
            className={`bg-main-10 m-5 flex flex-col rounded-tl-[22px] rounded-tr-[8px] rounded-br-[22px] rounded-bl-[8px] ${sizeClasses[size]}`}
        >
            {/* 카테고리 아이콘 또는 이미지 */}
            <div className="mb-2 flex w-full justify-start">
                <img src={imageUrl} alt={title} className={`${imageSizeClasses[size]} rounded-lg object-cover`} />
            </div>

            {/* 기사 제목 */}
            <div className="flex w-full flex-1 items-center">
                <div className="line-clamp-3 overflow-hidden text-ellipsis">{title}</div>
            </div>
        </div>
    );
}

export default ArticleCard;
