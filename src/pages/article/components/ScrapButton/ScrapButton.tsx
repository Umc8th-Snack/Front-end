import { useState } from 'react';

import { addScrap, deleteScrap } from '@/pages/article/apis/scrapApi';
import BookMarkIcon from '@/shared/assets/Bookmark.svg?react';

interface ScrapButtonProps {
    articleId: number;
}

const ScrapButton = ({ articleId }: ScrapButtonProps) => {
    const [isScrapped, setIsScrapped] = useState(false);

    const handleScrapToggle = async () => {
        try {
            if (isScrapped) {
                await deleteScrap(articleId);
                setIsScrapped(false);
                alert('스크랩 취소되었습니다.');
            } else {
                await addScrap(articleId);
                setIsScrapped(true);
                alert('스크랩 완료되었습니다.');
            }
        } catch (error) {
            console.error('스크랩 처리 실패:', error);
            alert('스크랩 처리에 실패했습니다.');
        }
    };

    return (
        <button onClick={() => void handleScrapToggle()} className="cursor-pointer">
            <BookMarkIcon className={isScrapped ? 'fill-black-30 stroke-black-30' : 'fill-none stroke-black'} />
        </button>
    );
};

export default ScrapButton;
