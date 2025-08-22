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
            <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                aria-label="배경 클릭하여 닫기"
                className="fixed inset-0 bg-black/50 focus:outline-none disabled:cursor-not-allowed"
            />

            <div
                ref={modalRef}
                className="relative z-10 w-[85%] max-w-[380px] rounded-2xl bg-white p-6 text-center shadow-md sm:p-9"
            >
                {/* 닫기 아이콘 버튼 */}
                <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="absolute top-3 right-3 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-black/5 disabled:opacity-50"
                    aria-label="닫기"
                    type="button"
                >
                    <XIcon />
                </button>

                <h2 id="delete-modal-title" className="text-24px-semibold sm:text-28px-semibold mt-3 sm:mt-2">
                    정말 탈퇴하시겠어요?
                </h2>

                <p id="delete-modal-desc" className="text-14px-medium text-black-70 sm:text-16px-medium mt-3">
                    탈퇴 버튼 선택 시, <br />
                    계정은 삭제되며 복구되지 않아요.
                </p>

                <div className="mt-6 flex flex-col items-stretch gap-4 px-4 sm:mt-8 sm:gap-5 sm:px-0">
                    <button
                        onClick={onConfirmDelete}
                        disabled={isLoading}
                        type="button"
                        className="text-16px-medium bg-danger/90 sm:text-18px-medium h-[50px] w-full cursor-pointer rounded-[8px] text-white hover:bg-[#d93025] disabled:opacity-60"
                    >
                        {isLoading ? '처리 중...' : '회원 탈퇴'}
                    </button>

                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        type="button"
                        className="text-16px-medium bg-black-30 hover:bg-black-50 sm:text-18px-medium h-[50px] w-full cursor-pointer rounded-[8px] text-white disabled:opacity-60"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
