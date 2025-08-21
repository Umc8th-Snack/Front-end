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
        <div className="border-main-30 w-[100%] rounded-[20px] border-[3px] bg-white px-6 pt-6 pb-6 lg:px-[30px] lg:pt-[30px] lg:pb-[28px]">
            <div className="flex justify-between">
                <div className="flex items-center space-x-[8px]">
                    <RectangleIcon />
                    <span className="text-20px-semibold md:text-24px-semibold relative">간추린 뉴스</span>
                </div>
                {showActions && (
                    <div className="mt-[-5px] flex items-center gap-[21px] md:mt-[-8px]">
                        <ScrapButton articleId={articleId} onSuccess={handleScrapSuccess} onError={handleScrapError} />
                        <button onClick={handleOpenShareModal} className="cursor-pointer" aria-label="공유하기">
                            <ShareIcon className="text-gray-400" />
                        </button>
                    </div>
                )}
            </div>
            <div className="text-16px-medium md:text-18px-medium text-black-70 mt-2 leading-8 break-words lg:mt-[5px]">
                {summary}
            </div>

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
