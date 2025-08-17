import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import CookieIcon from '@/shared/assets/icons/cookie-icon.svg?react';

type LoginRequiredModalProps = {
    open: boolean;
    onClose: () => void;
    onAuthClick: () => void;
};

const LoginRequiredModal = ({ open, onClose, onAuthClick }: LoginRequiredModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prev;
        };
    }, [open, onClose]);

    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-[1000] flex items-center justify-center" onClick={onClose}>
            <button type="button" className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div
                ref={modalRef}
                className="relative z-[1001] w-[440px] max-w-[92vw] rounded-[15px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-center">
                    <CookieIcon className="h-25 w-25 p-4" />
                </div>

                <h2 className="text-28px-semibold mb-1 text-center">로그인이 필요한 기능입니다.</h2>
                <p className="text-20px-medium text-black-70 mb-2 text-center">스내커가 되어 보세요!</p>

                <div className="flex flex-col items-center gap-3 p-4">
                    <button
                        onClick={onAuthClick}
                        className="text-20px-medium bg-main hover:bg-main-70 h-[56px] w-[320px] cursor-pointer rounded-[8px] border-none text-white transition"
                    >
                        로그인/회원가입
                    </button>
                    <button
                        onClick={onClose}
                        className="text-14px-medium text-black-50 h-8 cursor-pointer underline underline-offset-4"
                    >
                        메인 페이지로 돌아가기
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default LoginRequiredModal;
