import { useEffect, useState } from 'react';

import { addScrap, deleteScrap, getScrapExists } from '@/pages/article/apis/scrapApi';
import BookMarkIcon from '@/shared/assets/Bookmark.svg?react';

interface ScrapButtonProps {
    articleId: number;
    onSuccess?: (scrapped: boolean) => void;
    onError?: (msg?: string) => void;
}

const ScrapButton = ({ articleId, onSuccess, onError }: ScrapButtonProps) => {
    const [isScrapped, setIsScrapped] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        const fetchScrapStatus = async () => {
            try {
                setLoading(true);
                const res = await getScrapExists(articleId);
                if (!mounted) return;
                setIsScrapped(Boolean(res?.scrapped));
            } catch (_e) {
                if (!mounted) return;
                onError?.('스크랩 상태를 불러오지 못했어요.');
            } finally {
                if (mounted) setLoading(false);
            }
        };
        void fetchScrapStatus();
        return () => {
            mounted = false;
        };
    }, [articleId, onError]);

    const handleScrapToggle = async () => {
        if (loading) return;
        setLoading(true);

        const prev = isScrapped;
        const next = !prev;
        setIsScrapped(next);

        try {
            if (prev) {
                await deleteScrap(articleId);
            } else {
                await addScrap(articleId);
            }
            onSuccess?.(next);
        } catch (_e) {
            setIsScrapped(prev);
            onError?.('스크랩 처리에 실패했어요. 다시 시도해 주세요.');
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
