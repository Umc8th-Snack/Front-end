import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getRelatedArticles } from '@/pages/article/apis/getRelatedArticles';
import type { RelatedArticle } from '@/pages/article/types/share';
import ArticleCard from '@/shared/components/card/ArticleCard';

interface RelatedArticleListProps {
    onClose: () => void;
    articleId: number;
}

const RelatedArticleList = ({ onClose, articleId }: RelatedArticleListProps) => {
    const navigate = useNavigate();
    const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    useEffect(() => {
        const fetchRelatedArticles = async () => {
            if (!articleId) return;

            try {
                setIsLoading(true);
                const articles = await getRelatedArticles(articleId);
                setRelatedArticles(articles);
            } catch (err) {
                console.error('관련기사 로딩 실패:', err);
                setRelatedArticles([]);
            } finally {
                setIsLoading(false);
            }
        };

        // Promise를 적절히 처리
        fetchRelatedArticles().catch((err) => {
            console.error('관련기사 로딩 실패:', err);
        });
    }, [articleId]);

    const handleArticleClick = async (clickedArticleId: number) => {
        await navigate(`/articles/${clickedArticleId}`);
    };

    if (isLoading) {
        return (
            <div className="relative flex w-[240px] flex-col items-center rounded-[15px] bg-white p-8 shadow-[0_0_10px_rgba(0,0,0,0.15)]">
                <h2 className="mt-4 mb-4 text-xl font-semibold">관련 기사 보러가기</h2>
                <div className="flex flex-col gap-4">
                    <div className="my-2 h-[168px] w-[204px] animate-pulse rounded-lg rounded-tl-[22px] rounded-tr-[8px] rounded-br-[22px] rounded-bl-[8px] bg-gray-200 p-6"></div>
                    <div className="my-2 h-[168px] w-[204px] animate-pulse rounded-lg rounded-tl-[22px] rounded-tr-[8px] rounded-br-[22px] rounded-bl-[8px] bg-gray-200 p-6"></div>
                </div>
            </div>
        );
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="related-articles-title"
            className="relative flex w-[240px] flex-col items-center rounded-[15px] bg-white p-8 shadow-[0_0_10px_rgba(0,0,0,0.15)]"
        >
            <h2 id="related-articles-title" className="mt-4 mb-4 text-xl font-semibold">
                관련 기사 보러가기
            </h2>

            <div className="flex flex-col gap-4">
                {relatedArticles.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">
                        <p>관련 기사가 없습니다.</p>
                    </div>
                ) : (
                    relatedArticles.map((article) => (
                        <button
                            key={article.articleId}
                            onClick={() => void handleArticleClick(article.articleId)}
                            className="cursor-pointer text-left"
                        >
                            <ArticleCard title={article.title} imageUrl={article.imageUrl} size="sidebar" />
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export default RelatedArticleList;
