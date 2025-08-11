import { useEffect } from 'react';

import XIcon from '@/shared/assets/icons/close-x.svg?react';
import ArticleCard from '@/shared/components/card/ArticleCard';

interface RelatedArticleListProps {
    onClose: () => void;
}

const RelatedArticleList = ({ onClose }: RelatedArticleListProps) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="related-articles-title"
            className="relative flex w-[240px] flex-col items-center rounded-[15px] bg-white p-8 shadow-[0_0_10px_rgba(0,0,0,0.15)]"
        >
            <h2 id="related-articles-title" className="mt-4 mb-4 text-lg font-semibold">
                관련 기사 보러가기
            </h2>

            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />

            <button onClick={onClose} aria-label="닫기" className="absolute top-[12px] right-[8px] cursor-pointer">
                <XIcon />
            </button>
        </div>
    );
};

export default RelatedArticleList;
