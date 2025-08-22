import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ArticleLayout from '@/layout/ArticleLayout';
import { getArticleDetail } from '@/pages/article/apis/articleApi';
import ArticleHeader from '@/pages/article/components/ArticleHeader';
import AccordionTestPage from '@/pages/article/components/GlossaryQuiz';
import RelatedArticleList from '@/pages/article/components/RelatedArticleList/RelatedArticleList';
import SummarizedNewsContainer from '@/pages/article/components/SummarizedNewsContainer/SummarizedNewsContainer';
import type { ArticleDetail } from '@/pages/article/types/article';
import LoadingFallback from '@/routes/LoadingFallback';
import FloatingMemoButton from '@/shared/components/button/FloatingMemoButton';
import MemoPad from '@/shared/components/modal/MemoPad/MemoPad';

const ArticlePage = () => {
    const navigate = useNavigate();
    const { articleId } = useParams<{ articleId: string }>();
    const [article, setArticle] = useState<ArticleDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // 메모장 상태 관리
    const [isMemoPadOpen, setIsMemoPadOpen] = useState(false);

    // 메모장 토글 핸들러
    const handleToggleChange = (checked: boolean) => {
        setIsMemoPadOpen(checked);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!articleId) return;
            setIsLoading(true);
            setIsError(false);
            try {
                const data = await getArticleDetail(Number(articleId));
                setArticle(data);
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        void fetchData();
    }, [articleId]);

    if (isLoading) return <LoadingFallback />;

    if (isError || !article) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="rounded-2xl border border-black/10 bg-white p-8 text-center shadow">
                    <p className="text-18px-medium mb-8">기사 정보를 불러오지 못했어요.</p>
                    <button
                        className="text-16px-medium bg-main cursor-pointer rounded-xl border border-black/10 px-4 py-2 text-white"
                        onClick={() => void navigate(-1)}
                    >
                        뒤로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <ArticleLayout sidebarContent={<RelatedArticleList onClose={() => {}} articleId={article.articleId} />}>
                <ArticleHeader
                    title={article.title}
                    category={article.category}
                    originalLink={article.articleUrl}
                    isNotepadEnabled={isMemoPadOpen}
                    onNotepadToggle={handleToggleChange}
                />

                <hr className="border-black-30 w-full border-t" />

                {article && (
                    <div className="flex justify-center pt-4">
                        <SummarizedNewsContainer
                            summary={article.summary}
                            articleId={article.articleId}
                            title={article.title}
                            image={article.imageUrl ?? ''}
                        />
                    </div>
                )}
                <div className="pt-4">
                    <AccordionTestPage articleId={articleId} />
                </div>
            </ArticleLayout>

            {/* 메모장 오버레이 */}
            {isMemoPadOpen && articleId && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 md:top-0 md:right-0 md:items-start md:justify-end md:bg-transparent md:p-4 md:px-18 md:py-18"
                    onClick={() => setIsMemoPadOpen(false)}
                >
                    <div className="sm:mt-20" onClick={(e) => e.stopPropagation()}>
                        <MemoPad articleId={articleId} />
                    </div>
                </div>
            )}

            {/* Floating 메모장 버튼 (lg 미만에서만 표시) */}
            <FloatingMemoButton onClick={() => setIsMemoPadOpen(!isMemoPadOpen)} isActive={isMemoPadOpen} />
        </>
    );
};

export default ArticlePage;
