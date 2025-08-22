import { useEffect, useRef } from 'react';

import XIcon from '@/shared/assets/icons/close-x.svg?react';

interface DeleteAccountModalProps {
    onClose: () => void;
    onConfirmDelete: () => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const DeleteAccountModal = ({ onClose, onConfirmDelete, onCancel, isLoading }: DeleteAccountModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // ESC로 닫기 (로딩 중 비활성화)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !isLoading) onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose, isLoading]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6 sm:py-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-desc"
        >
            {/* ✅ 오버레이를 버튼으로 분리: a11y 규칙 충족 */}
            <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                aria-label="배경 클릭하여 닫기"
                className="fixed inset-0 bg-black/50 focus:outline-none disabled:cursor-not-allowed"
            />

            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-[600px] rounded-2xl bg-white p-5 text-center shadow-md sm:p-6 md:p-8"
            >
                {/* 닫기 아이콘 버튼 */}
                <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="absolute top-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 disabled:opacity-50"
                    aria-label="닫기"
                    type="button"
                >
                    <XIcon />
                </button>

                <h2 id="delete-modal-title" className="md:text-28px-semibold mt-2 text-2xl font-semibold">
                    정말 탈퇴하시겠어요?
                </h2>

                <p id="delete-modal-desc" className="text-black-70 md:text-20px-medium mt-3 text-base">
                    탈퇴 버튼 선택 시, <br className="hidden sm:block" />
                    계정은 삭제되며 복구되지 않아요.
                </p>

                <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-8">
                    <button
                        onClick={onConfirmDelete}
                        disabled={isLoading}
                        type="button"
                        className="bg-danger h-12 w-full rounded-[8px] text-white hover:bg-[#d93025] disabled:opacity-60 md:h-[68px] md:w-[432px] md:self-center"
                    >
                        <span className="md:text-24px-medium text-base">{isLoading ? '처리 중...' : '회원 탈퇴'}</span>
                    </button>

                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        type="button"
                        className="bg-black-30 hover:bg-black-50 h-12 w-full rounded-[8px] text-white disabled:opacity-60 md:h-[68px] md:w-[432px] md:self-center"
                    >
                        <span className="md:text-24px-medium text-base">취소</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
