import axiosInstance from '@/shared/apis/axios';

import type { ApiResponse, MainFeedParams, MainFeedResponse } from '../types/feedTypes';

/**
 * 메인 피드 기사 목록 조회
 * @param params - category: 카테고리 배열, lastArticleId: 마지막 기사 ID (무한스크롤용)
 * @returns 기사 목록, 다음 페이지 정보
 */
export const fetchMainFeedArticles = async (params: MainFeedParams): Promise<MainFeedResponse> => {
    console.log('API 호출 파라미터:', params);

    // category 배열을 쿼리 파라미터로 변환
    const queryParams = new URLSearchParams();
    params.category.forEach((cat) => {
        queryParams.append('category', cat);
    });

    // lastArticleId가 있으면 추가
    if (params.lastArticleId) {
        queryParams.append('lastArticleId', params.lastArticleId.toString());
    }

    const url = `/api/feeds/main?${queryParams.toString()}`;
    console.log('API 요청 URL:', url);

    const response = await axiosInstance.get<ApiResponse<MainFeedResponse>>(url);

    console.log('API 응답:', response.data);

    // API 응답이 실패한 경우
    if (!response.data.isSuccess) {
        throw new Error(response.data.message || '기사를 불러오는데 실패했습니다.');
    }

    // result가 없는 경우 빈 배열 반환
    if (!response.data.result) {
        console.log('API result가 없음 - 빈 배열 반환');
        return {
            articles: [],
            lastArticleId: null,
            hasNext: false,
        };
    }

    console.log('반환할 기사 개수:', response.data.result.articles?.length || 0);
    return response.data.result;
};
