import axiosInstance from '@/shared/apis/axios';

import type { QuizResult } from '../types/quizTypes';

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
        const response = await axiosInstance.get(`/api/articles/${articleId}/quiz`);
        console.log('API 응답 성공:', response);
        console.log('응답 데이터:', response.data);
        console.log('응답 result:', response.data.result);
        console.log('====================');

        return response.data.result;
    } catch (error) {
        console.error('=== 퀴즈 API 에러 ===');
        console.error('에러 발생:', error);
        console.error('====================');
        throw error;
    }
};
