import api from '@/shared/apis/api';

import type { CreateMemoRequest, Memo, MemoResponse, MemosResult, UpdateMemoRequest } from '../types/memoTypes';

/**
 * 메모 API 함수들
 */

// 특정 기사의 메모 목록 조회 (필터링)
export const getMemosByArticle = async (articleId: number): Promise<Memo[]> => {
    // 모든 메모를 가져온 후 특정 articleId로 필터링
    const allMemosResponse = await api.get<MemosResult>(`/api/memos?page=0&size=100`);

    let allMemos: Memo[] = [];
    if (allMemosResponse?.memos) {
        allMemos = allMemosResponse.memos;
    }

    // 특정 articleId에 해당하는 메모만 필터링하여 반환
    return allMemos.filter((memo) => memo.articleId === articleId);
};

// 메모 생성
export const createMemo = async (articleId: number, data: CreateMemoRequest): Promise<MemoResponse> => {
    // CreateMemoRequest 타입 사용 확인
    const requestData: CreateMemoRequest = data;
    const response = await api.post<MemoResponse>(`/api/articles/${articleId}/memos`, requestData);

    // api.ts에서 이미 result를 반환하므로 response 자체가 MemoResponse
    if (response?.memoId && response?.content) {
        return response;
    }

    throw new Error('메모 생성 응답에서 필요한 데이터를 찾을 수 없습니다.');
};

// 메모 수정
export const updateMemo = async (articleId: number, memoId: number, data: UpdateMemoRequest): Promise<MemoResponse> => {
    // UpdateMemoRequest 타입 사용 확인
    const requestData: UpdateMemoRequest = data;
    const response = await api.patch<MemoResponse>(`/api/articles/${articleId}/memos/${memoId}`, requestData);

    // api.ts에서 이미 result를 반환하므로 response 자체가 MemoResponse
    if (response?.memoId && response?.content) {
        return response;
    }

    throw new Error('메모 수정 응답에서 필요한 데이터를 찾을 수 없습니다.');
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
    const memo = memos.find((m) => m.memoId === memoId);
    if (!memo) {
        throw new Error('메모를 찾을 수 없습니다.');
    }
    return memo;
};
