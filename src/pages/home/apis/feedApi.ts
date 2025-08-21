import { CATEGORY_CODE_TO_NAME } from '@/pages/home/constants/categories';
import type { MainFeedParams, MainFeedResult } from '@/pages/home/types/feedTypes';
import api from '@/shared/apis/api';

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

    return api.get<MainFeedResult>(`/api/feeds/main?${search.toString()}`);
};
