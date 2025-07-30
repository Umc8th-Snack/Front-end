import React, { useEffect, useRef, useState } from 'react';

import XIcon from '@/shared/assets/icons/close-x.svg?react';

interface DeleteAccountModalProps {
    onClose: () => void;
    onConfirmDelete: () => void;
    onCancel: () => void;
}

// TODO: 아래 코드는 임시 기본 핸들러
// 라우팅 설정 후 실제 로직으로 변경하기
const DummyDeleteAccountModal = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        console.log('모달 닫기');
        setIsOpen(false);
    };

    const handleConfirmDelete = () => {
        alert('회원 탈퇴 완료');
        setIsOpen(false);
    };

    const handleCancel = () => {
        alert('탈퇴 취소');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return <DeleteAccountModal onClose={handleClose} onConfirmDelete={handleConfirmDelete} onCancel={handleCancel} />;
};

const DeleteAccountModal = ({ onClose, onConfirmDelete, onCancel }: DeleteAccountModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // ESC 키로 닫기
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // 바깥 클릭 시 닫기
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={handleOverlayClick}>
            <div ref={modalRef} className="relative h-[420px] w-[600px] rounded-[15px] bg-white shadow-md">
                {/* 닫기 버튼 */}
                <button onClick={onClose} className="absolute top-[12px] right-[8px] cursor-pointer">
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
                {/* TODO: bg-danger-dark (#d93025) index.css에 추가 고려 */}
                <button
                    onClick={onConfirmDelete}
                    className="bg-danger absolute top-[209px] left-1/2 flex h-[68px] w-[432px] -translate-x-1/2 cursor-pointer items-center justify-center rounded-[8px] text-white hover:bg-[#d93025]"
                >
                    <span className="text-24px-medium">회원 탈퇴</span>
                </button>

                {/* 취소 */}
                <button
                    onClick={onCancel}
                    className="bg-black-30 group hover:bg-black-50 absolute top-[299px] left-1/2 flex h-[68px] w-[432px] -translate-x-1/2 cursor-pointer items-center justify-center rounded-[8px] text-white"
                >
                    <span className="text-24px-medium group-hover:text-white">취소</span>
                </button>
            </div>
        </div>
    );
};

// 임시 export:
export default DummyDeleteAccountModal;

// TODO: 실제 사용 시 밑의 코드로 변경하기
// export default DeleteAccountModal;
