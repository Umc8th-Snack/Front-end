import { useQuery } from '@tanstack/react-query';

import { getQuizByArticleId, submitQuizAnswers } from '../apis/quizApi';
import { transformQuizData } from '../utils/quizDataTransformer';

/**
 * 퀴즈 해설 페이지의 데이터 로직을 관리하는 커스텀 훅
 * 퀴즈 질문과 채점 결과를 가져와서 통합된 데이터로 변환
 */
export const useQuizCommentary = (userAnswers: number[], articleId: number) => {
    // 퀴즈 질문 데이터 가져오기
    const { data: quizData, isLoading: isQuizLoading } = useQuery({
        queryKey: ['quiz', 'byArticleId', articleId],
        queryFn: () => getQuizByArticleId(articleId),
        enabled: !!articleId,
    });

    // 퀴즈 답안 제출 및 채점
    const { data: gradingResult, isLoading: isGradingLoading } = useQuery({
        queryKey: ['quiz-grading', articleId, userAnswers, quizData?.quizContent],
        queryFn: () => {
            if (!quizData?.quizContent) {
                throw new Error('퀴즈 데이터가 없습니다');
            }
            return submitQuizAnswers(
                articleId,
                userAnswers.map((answer: number, index: number) => {
                    const quizContent = quizData.quizContent[index];
                    if (!quizContent) {
                        throw new Error(`퀴즈 콘텐츠를 찾을 수 없습니다: 인덱스 ${index}`);
                    }
                    return {
                        quizId: quizContent.quizId,
                        submitted_answer_index: answer,
                    };
                })
            );
        },
        enabled: !!articleId && userAnswers.length > 0 && !!quizData?.quizContent,
    });

    // 데이터 변환
    const questions = transformQuizData(quizData, gradingResult);

    return {
        questions,
        isLoading: isQuizLoading || isGradingLoading,
        totalQuestions: questions.length,
        correctAnswers: questions.filter((q) => q.isCorrect).length,
    };
};
