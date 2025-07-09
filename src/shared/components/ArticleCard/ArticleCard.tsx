import React from 'react';

interface ArticleCardProps {
    title?: string;
    imageUrl?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title = 'article title', imageUrl = '' }) => {
    return (
        <div className="flex w-[260px] flex-col items-center rounded-xl border border-gray-200 bg-white p-6">
            {/* 이미지*/}
            <div className="relative mb-6 flex h-[120px] w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200">
                {imageUrl ? (
                    <img src={imageUrl} alt="article_img" className="h-full w-full object-cover" />
                ) : (
                    <span className="z-10 text-lg font-bold text-gray-700 select-none">사진</span>
                )}
            </div>

            {/* 기사 제목 */}
            <div className="w-full">
                <div className="mb-2 overflow-hidden text-[20px] font-bold text-ellipsis whitespace-nowrap">
                    {title}
                </div>
                <div className="w-full border-b border-gray-500" />
            </div>
        </div>
    );
};

export default ArticleCard;
