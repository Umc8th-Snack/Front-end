import { useCallback, useEffect, useState } from 'react';

import { createMemo, deleteMemo, getMemosByArticle, updateMemo } from '../apis/memoApi';
import type { Memo } from '../types/memoTypes';

interface UseMemoManagementProps {
    articleId: string | number;
}

interface MemoState {
    memos: Memo[];
    isLoading: boolean;
    error: string | null;
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
}

export const useMemoManagement = ({ articleId }: UseMemoManagementProps) => {
    // 메모 상태
    const [memoState, setMemoState] = useState<MemoState>({
        memos: [],
        isLoading: false,
        error: null,
        isCreating: false,
        isUpdating: false,
        isDeleting: false,
    });

    // 메모 목록 조회
    const fetchMemos = useCallback(async () => {
        if (!articleId) return;

        setMemoState((prev) => ({ ...prev, isLoading: true, error: null }));

        try {
            const response = await getMemosByArticle(typeof articleId === 'string' ? Number(articleId) : articleId);
            setMemoState((prev) => ({
                ...prev,
                memos: response.memos,
                isLoading: false,
            }));
        } catch (error) {
            setMemoState((prev) => ({
                ...prev,
                error: error instanceof Error ? error.message : '메모를 불러오는데 실패했습니다.',
                isLoading: false,
            }));
        }
    }, [articleId]);

    // 메모 생성
    const createNewMemo = useCallback(
        async (content: string) => {
            if (!articleId || !content.trim()) return;

            setMemoState((prev) => ({ ...prev, isCreating: true, error: null }));

            try {
                const articleIdNum = typeof articleId === 'string' ? Number(articleId) : articleId;
                const response = await createMemo(articleIdNum, { content: content }); // trim() 제거

                // API 응답 구조에 따라 memoId와 content 추출
                const memoId = response?.memoId;
                const memoContent = response?.content;

                if (!memoId || !memoContent) {
                    throw new Error('메모 생성 응답에서 필요한 데이터를 찾을 수 없습니다.');
                }

                // 새로 생성된 메모를 목록에 추가 (원본 content 사용)
                const createdMemo: Memo = {
                    memoId,
                    content: content, // 원본 content 사용 (trim하지 않음)
                    createdAt: new Date().toISOString(),
                    articleId: articleIdNum,
                };

                setMemoState((prev) => ({
                    ...prev,
                    memos: [createdMemo, ...prev.memos],
                    isCreating: false,
                }));

                return createdMemo;
            } catch (error) {
                setMemoState((prev) => ({
                    ...prev,
                    error: error instanceof Error ? error.message : '메모 생성에 실패했습니다.',
                    isCreating: false,
                }));
                throw error;
            }
        },
        [articleId]
    );

    // 메모 수정
    const updateExistingMemo = useCallback(
        async (memoId: number, content: string) => {
            if (!articleId || !content.trim()) return;

            setMemoState((prev) => ({ ...prev, isUpdating: true, error: null }));

            try {
                const articleIdNum = typeof articleId === 'string' ? Number(articleId) : articleId;
                const response = await updateMemo(articleIdNum, memoId, { content: content }); // trim() 제거

                // API 응답 구조에 따라 content 추출
                const updatedContent = response?.content;

                if (!updatedContent) {
                    throw new Error('메모 수정 응답에서 필요한 데이터를 찾을 수 없습니다.');
                }

                // 메모 목록에서 해당 메모 업데이트 (원본 content 사용)
                setMemoState((prev) => ({
                    ...prev,
                    memos: prev.memos.map((memo) =>
                        memo.memoId === memoId
                            ? { ...memo, content: content } // 원본 content 사용 (trim하지 않음)
                            : memo
                    ),
                    isUpdating: false,
                }));

                return response;
            } catch (error) {
                setMemoState((prev) => ({
                    ...prev,
                    error: error instanceof Error ? error.message : '메모 수정에 실패했습니다.',
                    isUpdating: false,
                }));
                throw error;
            }
        },
        [articleId]
    );

    // 메모 삭제
    const removeMemo = useCallback(
        async (memoId: number) => {
            if (!articleId) return;

            setMemoState((prev) => ({ ...prev, isDeleting: true, error: null }));

            try {
                const articleIdNum = typeof articleId === 'string' ? Number(articleId) : articleId;
                await deleteMemo(articleIdNum, memoId);

                // 메모 목록에서 해당 메모 제거
                setMemoState((prev) => ({
                    ...prev,
                    memos: prev.memos.filter((memo) => memo.memoId !== memoId),
                    isDeleting: false,
                }));
            } catch (error) {
                setMemoState((prev) => ({
                    ...prev,
                    error: error instanceof Error ? error.message : '메모 삭제에 실패했습니다.',
                    isDeleting: false,
                }));
                throw error;
            }
        },
        [articleId]
    );

    // 에러 초기화
    const clearError = useCallback(() => {
        setMemoState((prev) => ({ ...prev, error: null }));
    }, []);

    // 컴포넌트 마운트 시 메모 목록 조회
    useEffect(() => {
        void fetchMemos();
    }, [fetchMemos]);

    return {
        // 상태
        memos: memoState.memos,
        isLoading: memoState.isLoading,
        error: memoState.error,
        isCreating: memoState.isCreating,
        isUpdating: memoState.isUpdating,
        isDeleting: memoState.isDeleting,

        // 액션
        fetchMemos,
        createNewMemo,
        updateExistingMemo,
        removeMemo,
        clearError,
    };
};
