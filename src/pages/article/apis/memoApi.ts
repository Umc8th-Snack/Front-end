import api from '@/shared/apis/api';

import type {
    CreateMemoRequest,
    Memo,
    MemoListParams,
    MemoListResponse,
    MemoResponse,
    UpdateMemoRequest,
} from '../types/memoTypes';

/**
 * 메모 API 함수들
 */

// 메모 목록 조회
export const getMemos = async (params: MemoListParams = {}): Promise<MemoListResponse> => {
    const { page = 0, size = 5 } = params;

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await api.get<any>(`/api/memos?page=${page}&size=${size}`);

        // API 응답 구조에 따라 result.memos 추출
        if (response?.result?.memos) {
            return {
                memos: response.result.memos,
                page: response.result.page || page,
                size: response.result.size || size,
                totalPages: response.result.totalPages || 0,
                totalElements: response.result.totalElements || 0,
            };
        }

        // 기존 구조 지원 (fallback)
        if (response?.memos) {
            return response;
        }

        // 응답 구조를 찾을 수 없는 경우 기본값 반환
        return {
            memos: [],
            page,
            size,
            totalPages: 0,
            totalElements: 0,
        };
    } catch (error) {
        console.error('getMemos 에러:', error);
        // 에러 발생 시에도 기본값 반환
        return {
            memos: [],
            page,
            size,
            totalPages: 0,
            totalElements: 0,
        };
    }
};

// 특정 기사의 메모 목록 조회 (필터링)
export const getMemosByArticle = async (articleId: number, params: MemoListParams = {}): Promise<MemoListResponse> => {
    const { page = 0, size = 5 } = params;
    // API에서 articleId로 필터링하는 기능이 있다면 사용
    // 현재는 전체 메모를 가져온 후 클라이언트에서 필터링
    const allMemos = await getMemos({ page, size: 100 }); // 충분히 큰 size로 가져오기

    const filteredMemos = allMemos.memos.filter((memo) => memo.articleId === articleId);

    return {
        ...allMemos,
        memos: filteredMemos,
        totalElements: filteredMemos.length,
        totalPages: Math.ceil(filteredMemos.length / size),
    };
};

// 메모 생성
export const createMemo = async (articleId: number, data: CreateMemoRequest): Promise<MemoResponse> => {
    // CreateMemoRequest 타입 사용 확인
    const requestData: CreateMemoRequest = data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await api.post<any>(`/api/articles/${articleId}/memos`, requestData);

    // API 응답 구조에 따라 result에서 데이터 추출
    if (response?.result) {
        return response.result;
    }

    // 기존 구조 지원 (fallback)
    return response;
};

// 메모 수정
export const updateMemo = async (articleId: number, memoId: number, data: UpdateMemoRequest): Promise<MemoResponse> => {
    // UpdateMemoRequest 타입 사용 확인
    const requestData: UpdateMemoRequest = data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await api.patch<any>(`/api/articles/${articleId}/memos/${memoId}`, requestData);

    // API 응답 구조에 따라 result에서 데이터 추출
    if (response?.result) {
        return response.result;
    }

    // 기존 구조 지원 (fallback)
    return response;
};

// 메모 삭제
export const deleteMemo = async (articleId: number, memoId: number): Promise<void> => {
    return api.delete(`/api/articles/${articleId}/memos/${memoId}`);
};

// 메모 단일 조회 (필요시 사용)
export const getMemo = async (articleId: number, memoId: number): Promise<Memo> => {
    // API에 단일 메모 조회 엔드포인트가 있다면 사용
    // 현재는 목록에서 찾기
    const memos = await getMemosByArticle(articleId);
    const memo = memos.memos.find((m) => m.memoId === memoId);
    if (!memo) {
        throw new Error('메모를 찾을 수 없습니다.');
    }
    return memo;
};
