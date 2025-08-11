// shared/components/modal/DeleteAccountModal/DeleteAccountModal.tsx
import React, { useEffect, useRef } from 'react';

import XIcon from '@/shared/assets/icons/close-x.svg?react';

interface DeleteAccountModalProps {
    onClose: () => void;
    onConfirmDelete: () => void;
    onCancel: () => void;
    isLoading?: boolean; // 로딩 시 비활성화용
}

const DeleteAccountModal = ({ onClose, onConfirmDelete, onCancel, isLoading }: DeleteAccountModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // ESC로 닫기 (로딩 중에는 닫기 비활성화)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !isLoading) onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose, isLoading]);

    // 바깥 클릭 시 닫기 (로딩 중에는 닫기 비활성화)
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isLoading) return;
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={handleOverlayClick}
            tabIndex={-1}
            role="button"
            aria-label="Close modal"
        >
            <div ref={modalRef} className="relative h-[420px] w-[600px] rounded-[15px] bg-white shadow-md">
                {/* 닫기 버튼 */}
                <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="absolute top-[12px] right-[8px] cursor-pointer disabled:opacity-50"
                    aria-label="닫기"
                >
                    <XIcon />
                </button>

                {/* 문구 */}
                <div className="text-28px-semibold absolute top-[53px] left-1/2 h-[126px] w-[245px] -translate-x-1/2">
                    정말 탈퇴하시겠어요?
                </div>

                <div className="text-20px-medium text-black-70 absolute top-[111px] left-1/2 w-[262px] -translate-x-1/2 text-center">
                    탈퇴 버튼 선택 시, <br />
                    계정은 삭제되며 복구되지 않아요.
                </div>

                {/* 회원 탈퇴 */}
                <button
                    onClick={onConfirmDelete}
                    disabled={isLoading}
                    className="bg-danger absolute top-[209px] left-1/2 flex h-[68px] w-[432px] -translate-x-1/2 items-center justify-center rounded-[8px] text-white hover:bg-[#d93025] disabled:opacity-60"
                >
                    <span className="text-24px-medium">{isLoading ? '처리 중...' : '회원 탈퇴'}</span>
                </button>

                {/* 취소 */}
                <button
                    onClick={onCancel}
                    disabled={isLoading}
                    className="bg-black-30 group hover:bg-black-50 absolute top-[299px] left-1/2 flex h-[68px] w-[432px] -translate-x-1/2 items-center justify-center rounded-[8px] text-white disabled:opacity-60"
                >
                    <span className="text-24px-medium group-hover:text-white">취소</span>
                </button>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
