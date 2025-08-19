import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ArticleLayout from '@/layout/ArticleLayout';
import { getArticleDetail } from '@/pages/article/apis/articleApi';
import ArticleHeader from '@/pages/article/components/ArticleHeader';
import QuizCommentary from '@/pages/article/components/Quiz/QuizCommentary';
import RelatedArticleList from '@/pages/article/components/RelatedArticleList/RelatedArticleList';
import { useQuizCommentary } from '@/pages/article/hooks/useQuizCommentary';
import LoadingFallback from '@/routes/LoadingFallback';
import FloatingMemoButton from '@/shared/components/button/FloatingMemoButton';
import MemoPad from '@/shared/components/modal/MemoPad/MemoPad';

const QuizCommentaryPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userAnswers, articleId } = location.state || {};

    // 메모장 상태 관리
    const [isMemoPadOpen, setIsMemoPadOpen] = useState(false);

    // state가 없으면 기사 페이지로 리다이렉트 (에러 처리)
    useEffect(() => {
        if (!userAnswers || !articleId) {
            void navigate('/articles');
        }
    }, [userAnswers, articleId, navigate]);

    // 기사 상세 정보 가져오기
    const { data: article, isLoading: isArticleLoading } = useQuery({
        queryKey: ['article', 'detail', articleId],
        queryFn: () => getArticleDetail(Number(articleId)),
        enabled: !!articleId,
    });

    // 커스텀 훅으로 퀴즈 데이터 가져오기 (항상 호출되어야 함)
    const {
        questions,
        isLoading: isQuizLoading,
        totalQuestions,
        correctAnswers,
    } = useQuizCommentary(userAnswers || [], articleId || 0);

    // state가 없으면 렌더링하지 않음
    if (!userAnswers || !articleId) {
        return null;
    }

    // 로딩 중일 때 LoadingFallback 사용
    if (isArticleLoading || isQuizLoading) {
        return <LoadingFallback />;
    }

    // 기사 정보가 없으면 에러 처리
    if (!article) {
        return <div className="p-8 text-center text-lg font-semibold text-red-600">기사 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <>
            <ArticleLayout sidebarContent={<RelatedArticleList onClose={() => {}} articleId={article.articleId} />}>
                <ArticleHeader
                    title={article.title}
                    category={article.category}
                    originalLink={article.articleUrl}
                    isNotepadEnabled={isMemoPadOpen}
                    onNotepadToggle={setIsMemoPadOpen}
                />

                <hr className="border-black-30 w-full border-t" />

                <div className="pt-4">
                    <QuizCommentary
                        questions={questions}
                        totalQuestions={totalQuestions}
                        correctAnswers={correctAnswers}
                    />
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

export default QuizCommentaryPage;
