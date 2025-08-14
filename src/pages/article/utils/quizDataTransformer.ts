/** 퀴즈 데이터와 채점 결과를 Question[] 형태로 변환
 * API 응답 데이터를 컴포넌트에서 사용할 수 있게 가공합니당 */

import type { QuizGradingResult, QuizResult } from '../types/quizTypes';

export interface Question {
    id: number;
    question: string;
    answer: string;
    isCorrect: boolean;
    explanation: string;
}

export const transformQuizData = (
    quizData: QuizResult | undefined,
    gradingResult: QuizGradingResult | undefined,
    userAnswers?: number[] // 사용자 답안 추가
): Question[] => {
    // 데이터가 없으면 빈 배열 반환
    if (!quizData?.quizContent || !gradingResult?.details) {
        return [];
    }

    // 디버깅: API 응답 데이터 확인
    console.log('=== 퀴즈 데이터 변환 디버깅 ===');
    console.log('quizData:', quizData);
    console.log('gradingResult:', gradingResult);
    console.log('gradingResult.details:', gradingResult.details);
    console.log('userAnswers:', userAnswers);

    // 데이터가 있으면 통합하여 반환
    return quizData.quizContent
        .map((quiz, index) => {
            const gradingDetail = gradingResult.details.find((detail) => detail.quizId === quiz.quizId);

            if (!gradingDetail) return null;

            // 디버깅: 개별 답안 데이터 확인
            console.log(`퀴즈 ${index + 1}:`, {
                quizId: quiz.quizId,
                answer_index: gradingDetail.answer_index,
                answer_index_type: typeof gradingDetail.answer_index,
                userAnswer: userAnswers?.[index],
                answer_display: `${gradingDetail.answer_index}번`,
            });

            return {
                id: index + 1, // 1, 2, 3... 순차 번호로 변경
                question: quiz.question,
                answer: `${gradingDetail.answer_index}번`,
                isCorrect: gradingDetail.isCorrect,
                explanation: gradingDetail.description,
            };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);
};
