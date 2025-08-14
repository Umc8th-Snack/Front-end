import { useEffect, useState } from 'react';

import { addScrap, deleteScrap, getScrapExists } from '@/pages/article/apis/scrapApi';
import BookMarkIcon from '@/shared/assets/Bookmark.svg?react';

interface ScrapButtonProps {
    articleId: number;
}

const ScrapButton = ({ articleId }: ScrapButtonProps) => {
    const [isScrapped, setIsScrapped] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // 초기 상태를 서버에서 불러오기
        const fetchScrapStatus = async () => {
            try {
                const { data } = await getScrapExists(articleId);
                setIsScrapped(data.result.scrapped);
            } catch (e) {
                console.error('스크랩 여부 확인 실패', e);
            } finally {
                setLoading(false);
            }
        };
        void fetchScrapStatus();
    }, [articleId]);

    const handleScrapToggle = async () => {
        if (loading) return;
        setLoading(true);

        try {
            if (isScrapped) {
                await deleteScrap(articleId);
                setIsScrapped(false);
            } else {
                await addScrap(articleId);
                setIsScrapped(true);
            }
        } catch (e) {
            console.error('스크랩 처리 실패', e);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return null;

    return (
        <button
            type="button"
            onClick={() => void handleScrapToggle()}
            disabled={loading}
            aria-pressed={isScrapped}
            aria-label={isScrapped ? '스크랩 취소' : '스크랩'}
            className="cursor-pointer"
        >
            <BookMarkIcon
                className={isScrapped ? 'h-6 w-6 text-gray-400' : 'h-6 w-6 text-gray-400 [&>path]:fill-none'}
            />
        </button>
    );
};

export default ScrapButton;
