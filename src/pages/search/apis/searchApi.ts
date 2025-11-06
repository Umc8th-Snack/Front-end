import type { SemanticSearchResponse } from '@/pages/search/types/searchTypes';
import axiosInstance from '@/shared/apis/axios';

type Result = SemanticSearchResponse['result'];

export type SemanticSearchApiError = Error & {
    code?: string;
    payload?: Result;
};

export const isSemanticSearchApiError = (error: unknown): error is SemanticSearchApiError => {
    if (typeof error !== 'object' || error === null) {
        return false;
    }
    const maybe = error as SemanticSearchApiError;
    return 'code' in maybe || 'payload' in maybe;
};

const createSemanticSearchError = (message: string, code?: string, payload?: Result): SemanticSearchApiError => {
    const error = new Error(message) as SemanticSearchApiError;
    error.code = code;
    error.payload = payload;
    return error;
};

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
        const response = await axiosInstance.get<SemanticSearchResponse>('/api/articles/search', {
            params: { query, page, size, ...(threshold !== undefined ? { threshold } : {}) },
        });

        const data = response.data;

        if (data.code === 'FEED_9606') {
            const empty = normalizeResult({ query, articles: [], total_count: 0 }, query);
            console.log('[semanticSearch] FEED_9606 mapped to empty', {
                query_in_result: empty.query,
                articles_len: empty.articles.length,
                totalCount: empty.totalCount,
            });
            throw createSemanticSearchError('검색 결과가 없습니다.', data.code, empty);
        }

        if (!data.isSuccess) {
            throw createSemanticSearchError(data.message || '검색 요청이 실패했습니다.', data.code);
        }

        // 일부 백엔드가 204에서 ''(빈 문자열) 또는 null을 반환할 수 있으니 방어
        const normalized = normalizeResult(data.result, query);

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

        if (isSemanticSearchApiError(err)) {
            throw err;
        }

        console.log('[semanticSearch] error', err);
        throw err;
    }
}
