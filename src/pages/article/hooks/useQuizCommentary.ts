import { useQuery } from '@tanstack/react-query';

import { getQuizByArticleId, submitQuizAnswers } from '@/pages/article/apis/quizApi';
import { transformQuizData } from '@/pages/article/utils/quizDataTransformer';

/**
 * 퀴즈 해설 페이지의 데이터 로직을 관리!!
 * 퀴즈 질문과 채점 결과를 가져와서 통합된 데이터로 변환합니당
 */

export const useQuizCommentary = (userAnswers: number[], articleId: number) => {
    // 퀴즈 질문 데이터 가져오기
    const { data: quizData, isLoading: isQuizLoading } = useQuery({
        queryKey: ['quiz', 'byArticleId', articleId],
        queryFn: () => getQuizByArticleId(articleId),
        enabled: !!articleId,
    });

    // 퀴즈 콘텐츠 추출
    const quizContent = quizData?.quizContent;
    const hasQuizContent = Array.isArray(quizContent) && quizContent.length > 0;

    // 퀴즈 답안 제출 및 채점
    const { data: gradingResult, isLoading: isGradingLoading } = useQuery({
        queryKey: ['quiz-grading', articleId, userAnswers, hasQuizContent],
        queryFn: () => {
            if (!hasQuizContent) {
                throw new Error('퀴즈 데이터가 없습니다');
            }

            return submitQuizAnswers(
                articleId,
                userAnswers.map((answer: number, index: number) => {
                    // 안전한 배열 접근
                    if (index < 0 || index >= quizContent.length) {
                        throw new Error(`퀴즈 콘텐츠 인덱스 범위 오류: ${index}`);
                    }

                    const quizItem = quizContent[index];
                    if (!quizItem?.quizId) {
                        throw new Error(`퀴즈 아이템 데이터 오류: 인덱스 ${index}`);
                    }

                    return {
                        quizId: quizItem.quizId,
                        submitted_answer_index: answer,
                    };
                })
            );
        },
        enabled: !!articleId && userAnswers.length > 0 && hasQuizContent,
    });

    // 데이터 변환
    const questions = transformQuizData(quizData, gradingResult, userAnswers);

    return {
        questions,
        isLoading: isQuizLoading || isGradingLoading,
        totalQuestions: questions.length,
        correctAnswers: questions.filter((q) => q.isCorrect).length,
    };
};
