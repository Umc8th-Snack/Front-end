import { CATEGORY_CODE_TO_NAME } from '@/pages/home/constants/categories';
import type { MainFeedEnvelope, MainFeedParams, MainFeedResult } from '@/pages/home/types/feedTypes';
import axiosInstance from '@/shared/apis/axios';

const safeHas = (obj: object, key: PropertyKey): boolean => Object.prototype.hasOwnProperty.call(obj, key);

const categoryNameFromCode = (codeOrName: string): string => {
    if (safeHas(CATEGORY_CODE_TO_NAME, codeOrName)) {
        return CATEGORY_CODE_TO_NAME[codeOrName as keyof typeof CATEGORY_CODE_TO_NAME];
    }
    return codeOrName;
};

const normalizeToKoreanNames = (cats: string[]): string[] =>
    cats.map(categoryNameFromCode).filter((s): s is string => !!s && s.trim().length > 0);

export const fetchMainFeed = async (params: MainFeedParams): Promise<MainFeedResult> => {
    const names = normalizeToKoreanNames(params.categories);

    const search = new URLSearchParams();
    for (const nm of names) search.append('category', nm);
    if (params.lastArticleId != null) search.append('lastArticleId', String(params.lastArticleId));

    const url = `/api/feeds/main?${search.toString()}`;
    console.log('🚀 [메인피드 API] 요청:', {
        url,
        categories: names,
        lastArticleId: params.lastArticleId,
        queryString: search.toString(),
    });

    try {
        const res = await axiosInstance.get<MainFeedEnvelope>(url);
        console.log('✅ [메인피드 API] 응답:', {
            isSuccess: res.data?.isSuccess,
            code: res.data?.code,
            message: res.data?.message,
            articlesCount: res.data?.result?.articles?.length,
            nextCursorId: res.data?.result?.nextCursorId,
            categories: res.data?.result?.categories,
        });

        if (!res.data?.isSuccess) {
            console.error('❌ [메인피드 API] 실패:', {
                isSuccess: res.data?.isSuccess,
                code: res.data?.code,
                message: res.data?.message,
                fullResponse: res.data,
            });
            throw new Error(res.data?.message || '메인 피드 조회 실패');
        }

        return res.data.result;
    } catch (error) {
        console.error('❌ [메인피드 API] 에러:', error);
        throw error;
    }
};
