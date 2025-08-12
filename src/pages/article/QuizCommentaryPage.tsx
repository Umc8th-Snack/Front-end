import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ArticleHeader from '@/pages/article/components/ArticleHeader';
import QuizCommentary from '@/pages/article/components/Quiz/QuizCommentary';
import { useQuizCommentary } from '@/pages/article/hooks/useQuizCommentary';
import LoadingFallback from '@/routes/LoadingFallback';
import ArticleCard from '@/shared/components/card/ArticleCard';
import FieldChips from '@/shared/components/chip/FieldChips';

const QuizCommentaryPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userAnswers, articleId } = location.state || {};

    // state가 없으면 기사 페이지로 리다이렉트 (에러 처리)
    useEffect(() => {
        if (!userAnswers || !articleId) {
            void navigate('/articles'); // /article → /articles로 수정
        }
    }, [userAnswers, articleId, navigate]);

    // 커스텀 훅으로 퀴즈 데이터 가져오기 (항상 호출되어야 함)
    const { questions, isLoading, totalQuestions, correctAnswers } = useQuizCommentary(
        userAnswers || [],
        articleId || 0
    );

    // state가 없으면 렌더링하지 않음
    if (!userAnswers || !articleId) {
        return null;
    }

    // 로딩 중일 때 LoadingFallback 사용
    if (isLoading) {
        return <LoadingFallback />;
    }

    return (
        <>
            <div className="mx-auto flex w-full max-w-[1200px] items-start gap-30 px-4 py-8 lg:px-0">
                <div className="flex w-[70%] flex-col items-start justify-center">
                    <FieldChips label="사회" />
                    <div className="mt-10 w-full">
                        <ArticleHeader
                            title="기사 제목"
                            originalLink="https://www.snack.com"
                            isNotepadEnabled={true}
                            onNotepadToggle={() => {}}
                        />

                        <QuizCommentary
                            questions={questions}
                            totalQuestions={totalQuestions}
                            correctAnswers={correctAnswers}
                        />
                    </div>
                </div>

                {/* 관련 기사 보러가기 임의로 넣어둠 */}
                <div className="flex w-[30%] justify-end">
                    <div className="mt-30 flex h-[800px] w-[240px] flex-col items-center gap-3 rounded-2xl bg-gray-200">
                        <ArticleCard />
                        <ArticleCard />
                        <ArticleCard />
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuizCommentaryPage;
