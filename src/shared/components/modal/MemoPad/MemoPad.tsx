import { useCallback, useEffect, useRef, useState } from 'react';

import { useMemoManagement } from '@/pages/article/hooks/useMemoManagement';
import ShareToast from '@/shared/components/modal/ShareModal/ShareToast';

interface MemoPadProps {
    articleId: string;
}

const MemoPad = ({ articleId }: MemoPadProps) => {
    const {
        memos,
        isLoading,
        error,
        isCreating,
        isUpdating,
        isDeleting,
        createNewMemo,
        updateExistingMemo,
        removeMemo,
        clearError,
    } = useMemoManagement({ articleId });

    const autoSaveTimerRef = useRef<number | null>(null);
    const [currentEditingMemoId, setCurrentEditingMemoId] = useState<number>(0);
    const [currentContent, setCurrentContent] = useState<string>('');

    // 토스트 표시 상태 추가
    const [showToast, setShowToast] = useState(false);

    const clearAutoSaveTimer = useCallback(() => {
        if (autoSaveTimerRef.current) {
            window.clearTimeout(autoSaveTimerRef.current);
            autoSaveTimerRef.current = null;
        }
    }, []);

    const executeAutoSave = useCallback(
        async (memoId: number, content: string) => {
            try {
                if (content.trim().length === 0) {
                    if (memoId > 0) {
                        await removeMemo(memoId);
                        setCurrentEditingMemoId(0);
                        setCurrentContent('');
                    }
                } else if (memoId === 0) {
                    const newMemo = await createNewMemo(content);
                    if (newMemo) {
                        setCurrentEditingMemoId(newMemo.memoId);
                    }
                    // 새 메모 생성 시 토스트 표시
                    setShowToast(true);
                } else {
                    await updateExistingMemo(memoId, content);
                    // 기존 메모 수정 시 토스트 표시
                    setShowToast(true);
                }
            } catch (error) {
                console.error('자동 저장 실패:', error);
            }
        },
        [createNewMemo, updateExistingMemo, removeMemo]
    );

    const startAutoSaveTimer = useCallback(
        (memoId: number, content: string): void => {
            if (content.trim().length === 0 && memoId === 0) return;
            clearAutoSaveTimer();
            autoSaveTimerRef.current = window.setTimeout(() => {
                void executeAutoSave(memoId, content);
            }, 3000);
        },
        [clearAutoSaveTimer, executeAutoSave]
    );

    const handleContentChange = useCallback(
        (content: string): void => {
            setCurrentContent(content);
            if (content.trim().length > 0 || currentEditingMemoId > 0) {
                startAutoSaveTimer(currentEditingMemoId, content);
            }
        },
        [currentEditingMemoId, startAutoSaveTimer]
    );

    const initializeMemo = useCallback(() => {
        if (currentEditingMemoId > 0) return;
        if (memos.length > 0 && !isLoading) {
            const firstMemo = memos[0];
            setCurrentContent(firstMemo.content);
            setCurrentEditingMemoId(firstMemo.memoId);
        } else if (memos.length === 0 && !isLoading) {
            setCurrentContent('');
            setCurrentEditingMemoId(0);
        }
    }, [memos, isLoading, currentEditingMemoId]);

    useEffect(() => {
        initializeMemo();
    }, [initializeMemo]);

    useEffect(() => {
        return clearAutoSaveTimer;
    }, [clearAutoSaveTimer]);

    useEffect(() => {
        if (error) {
            const timer = window.setTimeout(() => {
                clearError();
            }, 5000);
            return () => window.clearTimeout(timer);
        }
        return undefined;
    }, [error, clearError]);

    const isDisabled = isLoading || isCreating || isUpdating || isDeleting;

    return (
        <div className="border-main-70 flex h-[320px] w-[320px] flex-col items-center justify-center rounded-[30px] border-[2px] bg-white p-4 shadow-2xl md:w-[500px] lg:h-[440px] lg:w-[360px] lg:p-0">
            <div className="text-28px-medium lg:text-36px-medium m-2 justify-center lg:mb-4">메모장</div>
            <div className="bg-main-70 mb-6 h-[2px] w-[260px] md:w-[420px] lg:w-[300px]"></div>

            <div className="border-black-30 mb-2 h-[180px] w-[260px] gap-4 rounded-[16px] border-[2px] px-2 py-3 md:mb-4 md:h-[200px] md:w-[420px] lg:mb-0 lg:h-[280px] lg:w-[300px]">
                <textarea
                    placeholder="메모를 입력하세요..."
                    value={currentContent}
                    onChange={(e) => handleContentChange(e.target.value)}
                    disabled={isDisabled}
                    className="text-18px-medium placeholder-black-70 h-full w-full resize-none overflow-y-scroll bg-[linear-gradient(to_bottom,transparent_31px,#94a3b8_31.5px,transparent_32px)] bg-[length:calc(100%-10px)_32px] [background-attachment:local] bg-repeat-y pr-[12px] text-[16px] leading-[32px] outline-none disabled:opacity-50"
                />

                <div className="text-14px-medium mt-3 text-center">
                    {isLoading && <div className="text-blue-600">메모를 불러오고 있습니다...</div>}
                    {error && <div className="text-red-600">저장되지 않았습니다.</div>}
                    {isCreating && <div className="text-green-600">저장 중...</div>}
                    {isUpdating && <div className="text-green-600">수정 중...</div>}
                    {isDeleting && <div className="text-orange-600">삭제 중...</div>}
                </div>
            </div>

            {/* 자동 저장 성공 시 토스트 표시 */}
            {showToast && (
                <ShareToast message="메모가 자동 저장되었습니다." duration={800} onDone={() => setShowToast(false)} />
            )}
        </div>
    );
};

export default MemoPad;
