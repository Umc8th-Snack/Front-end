import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getArticleDetail } from '@/pages/article/apis/articleApi';
import SummarizedNewsContainer from '@/pages/article/components/SummarizedNewsContainer/SummarizedNewsContainer';
import type { ArticleDetail } from '@/pages/article/types/article';
import AccordionTestPage from '@/pages/test/AccordionTestPage';
import LoadingFallback from '@/routes/LoadingFallback';
import ChainIcon from '@/shared/assets/icons/chain-icon.svg?react';
import FieldChips from '@/shared/components/chip/FieldChips';
import MemoPad from '@/shared/components/modal/MemoPad/MemoPad';

import RelatedArticleList from './components/RelatedArticleList/RelatedArticleList';
import TitleWithToggle from './components/TitleWithToggle/TitleWithToggle';

const ArticlePage = () => {
    const { articleId } = useParams<{ articleId: string }>();
    const [article, setArticle] = useState<ArticleDetail | null>(null);

    // 메모장 상태 관리
    const [isMemoPadOpen, setIsMemoPadOpen] = useState(false);

    // 메모장 토글 핸들러
    const handleToggleChange = (checked: boolean) => {
        setIsMemoPadOpen(checked);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!articleId) return;
            try {
                //  실제 API 호출
                const data = await getArticleDetail(Number(articleId));
                setArticle(data);
            } catch (e) {
                console.error('기사 상세 로딩 실패:', e);

                // API 호출 실패 시 더미 데이터 사용
                const dummyArticle = {
                    articleId: Number(articleId),
                    title: 'LG전자, AI 체험 공간 오픈...역사와 최신 기술 동시 체험',
                    summary:
                        'LG전자가 AI 체험 공간을 오픈했다. 이 공간에서는 LG의 역사를 체험하면서 동시에 최신 AI 기술을 체험할 수 있다. 이는 LG가 AI 기술 발전에 얼마나 집중하고 있는지를 보여주는 좋은 예시다.',
                    publishedAt: '2025-01-27T00:00:00.000Z',
                    category: '사회',
                    articleUrl: 'https://example.com/article',
                    imageUrl: 'https://via.placeholder.com/400x300',
                    snackUrl: 'https://snack.com/article',
                    viewCount: 1234,
                };
                setArticle(dummyArticle);
            }
        };
        void fetchData();
    }, [articleId]);

    if (!article) {
        return <LoadingFallback />;
    }

    return (
        <div className="px-6 py-6">
            <div className="mx-auto grid max-w-[1100px] grid-cols-[720px_264px] gap-30">
                <div>
                    <div className="flex flex-col gap-4 px-6 py-6">
                        {/* FieldChips + 원문 링크 */}
                        <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">
                            <FieldChips label={article.category} />
                            <div className="flex items-center gap-1">
                                <ChainIcon />
                                {article && (
                                    <a
                                        href={article.articleUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-20px-medium text-black-70 inline-block max-w-[525px] truncate align-bottom"
                                        title={article.articleUrl}
                                    >
                                        원문링크: {article.articleUrl}
                                    </a>
                                )}
                            </div>
                        </div>

                        <TitleWithToggle
                            title={article.title}
                            onToggleChange={handleToggleChange}
                            checked={isMemoPadOpen}
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
                    </div>
                </div>

                {/* 메모장 오버레이 */}
                {isMemoPadOpen && articleId && (
                    <div className="fixed top-0 right-0 z-50 px-18 py-8">
                        <div className="mt-20">
                            <MemoPad articleId={articleId} />
                        </div>
                    </div>
                )}

                {/* Sidebar */}
                <aside className="mt-8">
                    <div className="sticky top-15">
                        <RelatedArticleList onClose={() => {}} />
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ArticlePage;
