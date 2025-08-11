import { useQuery } from '@tanstack/react-query';

import { getQuizByArticleId } from '../apis/quizApi';
import type { QuizResult } from '../types/quizTypes';

/**
 * 특정 기사의 퀴즈를 가져오는 React Query 훅
 * @param articleId 기사 ID
 * @returns 퀴즈 데이터와 상태 정보
 */
export const useQuiz = (articleId: number) => {
    return useQuery<QuizResult>({
        queryKey: ['quiz', 'byArticleId', articleId],
        queryFn: () => getQuizByArticleId(articleId),
        enabled: !!articleId, // articleId가 있을 때만 실행
        staleTime: 5 * 60 * 1000, // 5분간 데이터를 신선하다고 간주
        gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    });
};
