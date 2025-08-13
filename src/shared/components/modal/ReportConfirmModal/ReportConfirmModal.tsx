import React, { useEffect, useRef } from 'react';

import XIcon from '@/shared/assets/icons/close-x.svg?react';

interface ReportConfirmModalProps {
    onClose: () => void;
    onConfirm: () => void;
}

const ReportConfirmModal = ({ onClose, onConfirm }: ReportConfirmModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={handleOverlayClick}
            aria-hidden="true"
        >
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                className="relative h-[400px] w-[400px] rounded-[10px] bg-white p-12 shadow-[0px_2.5px_2.5px_rgba(0,0,0,0.25)]"
            >
                <button onClick={onClose} className="absolute top-[12px] right-[8px] cursor-pointer">
                    <XIcon />
                </button>

                <h2 className="text-24px-semibold mb-4 pt-5 text-center">정말 신고하시겠습니까?</h2>

                <p className="text-18px-medium text-black-70 pt-3">
                    신고는 콘텐츠의 품질 저하, 부정확한 정보, <br /> 또는 AI 생성 콘텐츠에서 발생할 수 있는
                    <br /> 환각(허위 정보) 현상이 의심되는 경우에만 이용해 주세요.
                </p>
                <p className="text-18px-medium text-black-70 mt-4">
                    허위 신고일 경우, <br />
                    해당 신고는 반영되지 않을 수 있습니다.
                </p>

                <div className="absolute right-[16px] bottom-[16px]">
                    <button
                        onClick={onConfirm}
                        className="border-black-50 text-16px-medium text-black-70 hover:bg-main h-[35px] w-[64px] cursor-pointer rounded-[5px] border hover:border-none hover:text-white"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportConfirmModal;
