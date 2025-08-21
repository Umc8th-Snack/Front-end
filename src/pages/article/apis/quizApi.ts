import api from '@/shared/apis/api';

import type { QuizGradingResult, QuizResult } from '../types/quizTypes';

/**
 * 특정 기사의 퀴즈를 가져오는 API 함수
 * @param articleId 기사 ID
 * @returns 퀴즈 결과 데이터
 */
export const getQuizByArticleId = async (articleId: number): Promise<QuizResult> => {
    console.log('=== 퀴즈 API 호출 ===');
    console.log('요청 URL:', `/api/articles/${articleId}/quiz`);
    console.log('articleId:', articleId);

    try {
        const result = await api.get<QuizResult>(`/api/articles/${articleId}/quiz`);
        console.log('API 응답 성공');
        console.log('응답 result:', result);
        console.log('====================');

        return result;
    } catch (error) {
        console.error('=== 퀴즈 API 에러 ===');
        console.error('에러 발생:', error);
        console.error('====================');
        throw error;
    }
};

/**
 * 퀴즈 답안 제출 및 채점 API 함수
 * @param articleId 기사 ID
 * @param submittedAnswers 사용자가 제출한 답안 배열
 * @returns 채점 결과 데이터
 */
export const submitQuizAnswers = async (
    articleId: number,
    submittedAnswers: Array<{ quizId: number; submitted_answer_index: number }>
): Promise<QuizGradingResult> => {
    console.log('=== 퀴즈 채점 API 호출 ===');
    console.log('요청 URL:', `/api/quizzes/${articleId}/submit`);
    console.log('articleId:', articleId);
    console.log('submittedAnswers:', submittedAnswers);

    try {
        const result = await api.post<QuizGradingResult>(`/api/quizzes/${articleId}/submit`, {
            submittedAnswers,
        });
        console.log('채점 API 응답 성공');
        console.log('응답 result:', result);
        console.log('====================');

        return result;
    } catch (error) {
        console.error('=== 퀴즈 채점 API 에러 ===');
        console.error('에러 발생:', error);
        console.error('====================');
        throw error;
    }
};
