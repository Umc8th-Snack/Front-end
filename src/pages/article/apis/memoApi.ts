import api from '@/shared/apis/api';

import type { CreateMemoRequest, Memo, MemoResponse, UpdateMemoRequest } from '../types/memoTypes';

/**
 * 메모 API 함수들
 */

// 특정 기사의 메모 목록 조회 (필터링)
export const getMemosByArticle = async (articleId: number): Promise<Memo[]> => {
    // 모든 메모를 가져온 후 특정 articleId로 필터링
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allMemosResponse = await api.get<any>(`/api/memos?page=0&size=100`);

    let allMemos: Memo[] = [];
    if (allMemosResponse?.result?.memos) {
        allMemos = allMemosResponse.result.memos;
    } else if (allMemosResponse?.memos) {
        // 기존 구조 지원 (fallback)
        allMemos = allMemosResponse.memos;
    }

    // 특정 articleId에 해당하는 메모만 필터링하여 반환
    return allMemos.filter((memo) => memo.articleId === articleId);
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
    const memo = memos.find((m) => m.memoId === memoId);
    if (!memo) {
        throw new Error('메모를 찾을 수 없습니다.');
    }
    return memo;
};
