import { useEffect, useRef, useState } from 'react';

import { useMemoManagement } from '@/pages/article/hooks';

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
    const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // 현재 편집 중인 메모 ID (새 메모는 0)
    const [currentEditingMemoId, setCurrentEditingMemoId] = useState<number>(0);

    // 현재 textarea 내용
    const [currentContent, setCurrentContent] = useState('');

    // 자동 저장 타이머 설정
    const startAutoSaveTimer = (memoId: number, content: string): void => {
        // 빈 내용이고 새 메모인 경우 타이머 시작하지 않음
        if (content.trim().length === 0 && memoId === 0) {
            return;
        }

        if (autoSaveTimerRef.current) {
            clearTimeout(autoSaveTimerRef.current);
        }

        autoSaveTimerRef.current = setTimeout(() => {
            const autoSave = async () => {
                try {
                    if (content.trim().length === 0) {
                        // 내용이 비어있으면 삭제 (기존 메모만)
                        if (memoId > 0) {
                            await removeMemo(memoId);
                            // 삭제 후 새 메모 모드로 전환
                            setCurrentEditingMemoId(0);
                            setCurrentContent('');
                        }
                    } else if (memoId === 0) {
                        // 새 메모 생성 (내용이 있을 때만)
                        const newMemo = await createNewMemo(content);
                        if (newMemo) {
                            // 생성된 메모의 ID로 설정하여 수정 모드로 전환
                            setCurrentEditingMemoId(newMemo.memoId);
                        }
                    } else {
                        // 기존 메모 수정
                        await updateExistingMemo(memoId, content);
                    }
                } catch (error) {
                    console.error('자동 저장 실패:', error);
                }
            };
            void autoSave();
        }, 3000); // 3초 딜레이
    };

    // textarea 내용 변경 핸들러
    const handleContentChange = (content: string) => {
        setCurrentContent(content);

        // 빈 내용이거나 사용자가 실제로 입력한 경우에만 자동 저장 타이머 시작
        if (content.trim().length > 0 || currentEditingMemoId > 0) {
            startAutoSaveTimer(currentEditingMemoId, content);
        }
    };

    // 컴포넌트 마운트 시 기존 메모가 있으면 첫 번째 메모 내용으로 설정
    useEffect(() => {
        // 이미 편집 중인 메모가 있으면 덮어쓰지 않음
        if (currentEditingMemoId > 0) return;

        if (memos.length > 0 && !isLoading) {
            const firstMemo = memos[0];
            setCurrentContent(firstMemo.content);
            setCurrentEditingMemoId(firstMemo.memoId);
        } else if (memos.length === 0 && !isLoading) {
            // 메모가 없으면 새 메모 모드로 설정
            setCurrentContent('');
            setCurrentEditingMemoId(0);
        }
    }, [memos, isLoading, currentEditingMemoId]);

    // 컴포넌트 언마운트 시 타이머 정리
    useEffect(() => {
        return () => {
            if (autoSaveTimerRef.current) {
                clearTimeout(autoSaveTimerRef.current);
            }
        };
    }, []);

    // 에러 메시지 자동 숨김
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                clearError();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, clearError]);

    return (
        <div className="border-main flex h-[440px] w-[360px] flex-col items-center justify-center rounded-[48px] border-[2px] bg-white shadow-2xl">
            <div className="text-36px-medium mb-4 justify-center">메모장</div>
            <div className="bg-main mb-6 h-[2px] w-[300px]"></div>

            {/* 메모 입력 영역 */}
            <div className="border-black-30 h-[280px] w-[300px] rounded-[16px] border-[2px] px-2 py-3">
                <textarea
                    placeholder="메모를 입력하세요..."
                    value={currentContent}
                    onChange={(e) => handleContentChange(e.target.value)}
                    disabled={isLoading}
                    className="text-18px-medium placeholder-black-70 h-full w-full resize-none overflow-y-scroll bg-[linear-gradient(to_bottom,transparent_31px,#94a3b8_31.5px,transparent_32px)] bg-[length:calc(100%-10px)_32px] [background-attachment:local] bg-repeat-y pr-[12px] text-[16px] leading-[32px] outline-none disabled:opacity-50"
                />

                {/* 상태 메시지 영역 */}
                <div className="mt-2 text-center text-xs">
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
