import { useState } from 'react';

import BookMarkIcon from '@/shared/assets/Bookmark.svg?react';
import RectangleIcon from '@/shared/assets/Rectangle105.svg?react';
import ShareIcon from '@/shared/assets/Share.svg?react';
import ShareModal from '@/shared/components/modal/ShareModal/ShareModal';

interface SummarizedNewsContainerProps {
    summary: string;
    articleId: number;
    title: string;
    image: string;
}

const SummarizedNewsContainer = ({ summary, articleId, title, image }: SummarizedNewsContainerProps) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const handleOpenShareModal = () => setIsShareModalOpen(true);
    const handleCloseShareModal = () => setIsShareModalOpen(false);

    return (
        <div className="border-main-30 w-[690px] rounded-[30px] border-[3px] bg-white px-[30px] pt-[30px] pb-[28px]">
            <div className="flex justify-between">
                <div className="flex space-x-[8px]">
                    <RectangleIcon />
                    <span className="text-28px-semibold relative top-[-10px] text-black">간추린 뉴스</span>
                </div>
                <div className="mt-[-20px] flex items-center gap-[21px]">
                    <BookMarkIcon />
                    <button onClick={handleOpenShareModal} className="cursor-pointer" aria-label="공유하기">
                        <ShareIcon />
                    </button>
                </div>
            </div>
            <div className="text-18px-medium text-black-70 mt-[5px] break-words">{summary}</div>

            {isShareModalOpen && (
                <ShareModal
                    articleId={articleId}
                    title={title}
                    description={summary}
                    image={image}
                    onClose={handleCloseShareModal}
                />
            )}
        </div>
    );
};

export default SummarizedNewsContainer;
