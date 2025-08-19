import { useCallback, useEffect, useRef, useState } from 'react';

import { useMemoManagement } from '@/pages/article/hooks/useMemoManagement';

interface MemoPadProps {
    articleId: string;
}

const MemoPad = ({ articleId }: MemoPadProps) => {
    // 메모 관리 훅 사용
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

    // 자동 저장을 위한 타이머 ref
    const autoSaveTimerRef = useRef<number | null>(null);

    // 현재 편집 중인 메모 ID (새 메모는 0)
    const [currentEditingMemoId, setCurrentEditingMemoId] = useState<number>(0);

    // 현재 textarea 내용
    const [currentContent, setCurrentContent] = useState<string>('');

    // 자동 저장 타이머 정리 함수
    const clearAutoSaveTimer = useCallback(() => {
        if (autoSaveTimerRef.current) {
            window.clearTimeout(autoSaveTimerRef.current);
            autoSaveTimerRef.current = null;
        }
    }, []);

    // 자동 저장 실행 함수
    const executeAutoSave = useCallback(
        async (memoId: number, content: string) => {
            try {
                if (content.trim().length === 0) {
                    // 내용이 비어있으면 삭제 (기존 메모만)
                    if (memoId > 0) {
                        await removeMemo(memoId);
                        setCurrentEditingMemoId(0);
                        setCurrentContent('');
                    }
                } else if (memoId === 0) {
                    // 새 메모 생성 (내용이 있을 때만)
                    const newMemo = await createNewMemo(content);
                    if (newMemo) {
                        setCurrentEditingMemoId(newMemo.memoId);
                    }
                } else {
                    // 기존 메모 수정
                    await updateExistingMemo(memoId, content);
                }
            } catch (error) {
                console.error('자동 저장 실패:', error);
            }
        },
        [createNewMemo, updateExistingMemo, removeMemo]
    );

    // 자동 저장 타이머 설정
    const startAutoSaveTimer = useCallback(
        (memoId: number, content: string): void => {
            // 빈 내용이고 새 메모인 경우 타이머 시작하지 않음
            if (content.trim().length === 0 && memoId === 0) {
                return;
            }

            // 기존 타이머 정리
            clearAutoSaveTimer();

            // 새 타이머 설정 (3초 후 자동 저장)
            autoSaveTimerRef.current = window.setTimeout(() => {
                void executeAutoSave(memoId, content);
            }, 3000);
        },
        [clearAutoSaveTimer, executeAutoSave]
    );

    // textarea 내용 변경 핸들러
    const handleContentChange = useCallback(
        (content: string): void => {
            setCurrentContent(content);

            // 빈 내용이거나 사용자가 실제로 입력한 경우에만 자동 저장 타이머 시작
            if (content.trim().length > 0 || currentEditingMemoId > 0) {
                startAutoSaveTimer(currentEditingMemoId, content);
            }
        },
        [currentEditingMemoId, startAutoSaveTimer]
    );

    // 초기 메모 설정
    const initializeMemo = useCallback(() => {
        if (currentEditingMemoId > 0) return; // 이미 편집 중이면 유지

        if (memos.length > 0 && !isLoading) {
            const firstMemo = memos[0];
            setCurrentContent(firstMemo.content);
            setCurrentEditingMemoId(firstMemo.memoId);
        } else if (memos.length === 0 && !isLoading) {
            setCurrentContent('');
            setCurrentEditingMemoId(0);
        }
    }, [memos, isLoading, currentEditingMemoId]);

    // 컴포넌트 마운트 시 초기 메모 설정
    useEffect(() => {
        initializeMemo();
    }, [initializeMemo]);

    // 컴포넌트 언마운트 시 타이머 정리
    useEffect(() => {
        return clearAutoSaveTimer;
    }, [clearAutoSaveTimer]);

    // 에러 메시지 자동 숨김
    useEffect(() => {
        if (error) {
            const timer = window.setTimeout(() => {
                clearError();
            }, 5000);
            return () => window.clearTimeout(timer);
        }
        // error가 false일 때는 cleanup 함수가 필요 없으므로 undefined 반환
        return undefined;
    }, [error, clearError]);

    // 로딩 상태에 따른 비활성화
    const isDisabled = isLoading || isCreating || isUpdating || isDeleting;

    return (
        <div className="border-main-70 flex h-[320px] w-[500px] flex-col items-center justify-center rounded-[30px] border-[2px] bg-white p-4 shadow-2xl lg:h-[440px] lg:w-[360px] lg:p-0">
            <div className="text-28px-medium lg:text-36px-medium m-2 justify-center lg:mb-4">메모장</div>
            <div className="bg-main-70 mb-6 h-[2px] w-[420px] lg:w-[300px]"></div>

            {/* 메모 입력 영역 */}
            <div className="border-black-30 mb-4 h-[200px] w-[420px] gap-4 rounded-[16px] border-[2px] px-2 py-3 lg:mb-0 lg:h-[280px] lg:w-[300px]">
                <textarea
                    placeholder="메모를 입력하세요..."
                    value={currentContent}
                    onChange={(e) => handleContentChange(e.target.value)}
                    disabled={isDisabled}
                    className="text-18px-medium placeholder-black-70 h-full w-full resize-none overflow-y-scroll bg-[linear-gradient(to_bottom,transparent_31px,#94a3b8_31.5px,transparent_32px)] bg-[length:calc(100%-10px)_32px] [background-attachment:local] bg-repeat-y pr-[12px] text-[16px] leading-[32px] outline-none disabled:opacity-50"
                />

                {/* 상태 메시지 영역 */}
                <div className="text-14px-medium mt-3 text-center">
                    {isLoading && <div className="text-blue-600">메모를 불러오고 있습니다...</div>}
                    {error && <div className="text-red-600">저장되지 않았습니다.</div>}
                    {isCreating && <div className="text-green-600">저장 중...</div>}
                    {isUpdating && <div className="text-green-600">수정 중...</div>}
                    {isDeleting && <div className="text-orange-600">삭제 중...</div>}
                </div>
            </div>
        </div>
    );
};

export default MemoPad;
