import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ArticleLayout from '@/layout/ArticleLayout';
import { getArticleDetail } from '@/pages/article/apis/articleApi';
import ArticleHeader from '@/pages/article/components/ArticleHeader';
import AccordionTestPage from '@/pages/article/components/GlossaryQuiz';
import RelatedArticleList from '@/pages/article/components/RelatedArticleList/RelatedArticleList';
import SummarizedNewsContainer from '@/pages/article/components/SummarizedNewsContainer/SummarizedNewsContainer';
import type { ArticleDetail } from '@/pages/article/types/article';
import LoadingFallback from '@/routes/LoadingFallback';
import MemoPad from '@/shared/components/modal/MemoPad/MemoPad';

const ArticlePage = () => {
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
                        onClick={() => location.reload()}
                    >
                        다시 시도하기
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
                <div className="pt-8">
                    <AccordionTestPage articleId={articleId} />
                </div>
            </ArticleLayout>

            {/* 메모장 오버레이 */}
            {isMemoPadOpen && articleId && (
                <div className="fixed top-0 right-0 z-50 px-18 py-18">
                    <div className="mt-20">
                        <MemoPad articleId={articleId} />
                    </div>
                </div>
            )}
        </>
    );
};

export default ArticlePage;
