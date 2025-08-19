import { useState } from 'react';

import ScrapButton from '@/pages/article/components/ScrapButton/ScrapButton';
import RectangleIcon from '@/shared/assets/Rectangle105.svg?react';
import ShareIcon from '@/shared/assets/Share.svg?react';
import ShareModal from '@/shared/components/modal/ShareModal/ShareModal';
import ShareToast from '@/shared/components/modal/ShareModal/ShareToast';

interface SummarizedNewsContainerProps {
    summary: string;
    articleId: number;
    title: string;
    image: string;
    showActions?: boolean;
}

const SummarizedNewsContainer = ({
    summary,
    articleId,
    title,
    image,
    showActions = true,
}: SummarizedNewsContainerProps) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMsg, setToastMsg] = useState('');

    const handleOpenShareModal = () => setIsShareModalOpen(true);
    const handleCloseShareModal = () => setIsShareModalOpen(false);

    const handleScrapSuccess = (scrapped: boolean) => {
        setToastMsg(scrapped ? '스크랩에 추가됐어요.' : '스크랩을 취소했어요.');
        setToastOpen(true);
    };

    const handleScrapError = (msg?: string) => {
        setToastMsg(msg ?? '스크랩에 실패했어요. 다시 시도해 주세요.');
        setToastOpen(true);
    };

    return (
        <div className="border-main-30 w-[100%] rounded-[30px] border-[3px] bg-white px-[30px] pt-[30px] pb-[28px]">
            <div className="flex justify-between">
                <div className="flex space-x-[8px]">
                    <RectangleIcon />
                    <span className="text-28px-semibold relative top-[-10px] text-black">간추린 뉴스</span>
                </div>
                {showActions && (
                    <div className="mt-[-25px] flex items-center gap-[21px]">
                        <ScrapButton articleId={articleId} onSuccess={handleScrapSuccess} onError={handleScrapError} />
                        <button onClick={handleOpenShareModal} className="cursor-pointer" aria-label="공유하기">
                            <ShareIcon className="text-gray-400" />
                        </button>
                    </div>
                )}
            </div>
            <div className="text-18px-medium text-black-70 mt-[5px] leading-8 break-words">{summary}</div>

            {isShareModalOpen && (
                <ShareModal
                    articleId={articleId}
                    title={title}
                    description={summary}
                    image={image}
                    onClose={handleCloseShareModal}
                />
            )}
            {toastOpen && <ShareToast message={toastMsg} onDone={() => setToastOpen(false)} />}
        </div>
    );
};

export default SummarizedNewsContainer;
