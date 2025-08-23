import type { SemanticSearchResponse } from '@/pages/search/types/searchTypes';
import api from '@/shared/apis/api';

type Result = SemanticSearchResponse['result'];

const normalizeResult = (raw: any, fallbackQuery = ''): Result => {
    const query = raw?.query ?? fallbackQuery ?? '';
    const articles = Array.isArray(raw?.articles) ? raw.articles : [];

    const totalCount =
        typeof raw?.totalCount === 'number'
            ? raw.totalCount
            : typeof raw?.total_count === 'number'
              ? raw.total_count
              : 0;

    return { query, articles, totalCount };
};

export async function semanticSearch(params: {
    query: string;
    page?: number;
    size?: number;
    threshold?: number;
}): Promise<Result> {
    const { query, page = 0, size = 10, threshold } = params;

    console.log('[semanticSearch] req', {
        query,
        page,
        size,
        ...(threshold !== undefined ? { threshold } : {}),
    });

    try {
        const res = await api.get<Result>('/api/articles/search', {
            params: { query, page, size, ...(threshold !== undefined ? { threshold } : {}) },
            // validateStatus 제거 (ApiRequestOptionsTypes에 없음)
        });

        // 일부 백엔드가 204에서 ''(빈 문자열) 또는 null을 반환할 수 있으니 방어
        const normalized = normalizeResult(res, query);

        console.log('[semanticSearch] res', {
            query_in_result: normalized.query,
            articles_len: normalized.articles.length,
            totalCount: normalized.totalCount,
        });

        return normalized;
    } catch (err: any) {
        // 204 No Content를 에러로 던지는 래퍼라면 여기서 빈 결과로 변환
        const status = err?.response?.status;
        if (status === 204) {
            const empty = normalizeResult({ query, articles: [], total_count: 0 }, query);
            console.log('[semanticSearch] 204 mapped to empty', empty);
            return empty;
        }
        console.log('[semanticSearch] error', err);
        throw err;
    }
}
