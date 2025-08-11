import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getQuizByArticleId, submitQuizAnswers } from '@/pages/article/apis/quizApi';
import LoadingFallback from '@/routes/LoadingFallback';
import ArticleCard from '@/shared/components/card/ArticleCard';
import FieldChips from '@/shared/components/chip/FieldChips';
import ArticleHeader from '@/shared/components/quiz/ArticleHeader';
import QuizCommentary from '@/shared/components/quiz/QuizCommentary';

const QuizCommentaryPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userAnswers, articleId } = location.state || {};

    // state가 없으면 기사 페이지로 리다이렉트 (에러 처리)
    useEffect(() => {
        if (!userAnswers || !articleId) {
            void navigate('/article');
        }
    }, [userAnswers, articleId, navigate]);

    // 퀴즈 질문 데이터 가져오기 (항상 호출되도록)
    const { data: quizData, isLoading: isQuizLoading } = useQuery({
        queryKey: ['quiz', 'byArticleId', articleId],
        queryFn: () => getQuizByArticleId(articleId),
        enabled: !!articleId,
    });

    // 퀴즈 답안 제출 및 채점 (항상 호출되도록)
    const { data: gradingResult, isLoading: isGradingLoading } = useQuery({
        queryKey: ['quiz-grading', articleId, userAnswers, quizData?.quizContent],
        queryFn: () => {
            if (!quizData?.quizContent) {
                throw new Error('퀴즈 데이터가 없습니다');
            }
            return submitQuizAnswers(
                articleId,
                userAnswers.map((answer: number, index: number) => ({
                    quizId: quizData.quizContent[index].quizId,
                    submitted_answer_index: answer,
                }))
            );
        },
        enabled: !!articleId && userAnswers.length > 0 && !!quizData?.quizContent,
    });

    // state가 없으면 렌더링하지 않음 (훅 호출 후에 체크)
    if (!userAnswers || !articleId) {
        return null;
    }

    // 로딩 중일 때 LoadingFallback 사용
    if (isQuizLoading || isGradingLoading) {
        return <LoadingFallback />;
    }

    // 질문과 채점 결과를 통합하여 Question[] 형태로 변환
    const questions = (() => {
        // 데이터가 없으면 빈 배열 반환
        if (!quizData?.quizContent || !gradingResult?.details) {
            return [];
        }

        // 데이터가 있으면 통합하여 반환
        return quizData.quizContent
            .map((quiz) => {
                const gradingDetail = gradingResult.details.find((detail) => detail.quizId === quiz.quizId);

                if (!gradingDetail) return null;

                return {
                    id: quiz.quizId,
                    question: quiz.question,
                    answer: `정답: ${gradingDetail.answer_index + 1}번`,
                    isCorrect: gradingDetail.isCorrect,
                    explanation: gradingDetail.description,
                };
            })
            .filter((item): item is NonNullable<typeof item> => item !== null);
    })();

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

                        <QuizCommentary questions={questions} />
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
