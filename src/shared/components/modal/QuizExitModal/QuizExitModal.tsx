import React, { useEffect, useRef } from 'react';

import XIcon from '@/shared/assets/icons/close-x.svg?react';

interface QuizExitModalProps {
    onClose: () => void;
    onContinue: () => void;
    onExit: () => void;
}

const QuizExitModal = ({ onClose, onContinue, onExit }: QuizExitModalProps) => {
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

    const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={handleOverlayClick}
            onKeyDown={handleOverlayKeyDown}
            tabIndex={-1}
            role="button"
            aria-label="Close modal"
        >
            <div ref={modalRef} className="relative h-[350px] w-[350px] rounded-[10px] bg-white shadow-md">
                {/* 닫기 버튼 */}
                <button onClick={onClose} className="absolute top-[12px] right-[8px] cursor-pointer">
                    <XIcon />
                </button>

                {/* 문구 */}
                <div className="text-28px-semibold absolute top-[35px] left-1/2 h-[126px] w-[245px] -translate-x-1/2">
                    잠깐, <br />
                    아직 풀지 못한 문제가 <br />
                    남았어요!
                </div>

                {/* 이어풀기 */}
                <button
                    onClick={onContinue}
                    className="border-black-50 hover:bg-main text-black-70 absolute top-[209px] left-1/2 flex h-[40px] w-[240px] -translate-x-1/2 cursor-pointer items-center justify-center rounded-[5px] border border-[0.63px] hover:border-none hover:text-white"
                >
                    <span className="text-18px-medium group-hover:text-white">이어풀기</span>
                </button>

                {/* 중단하기 */}
                <button
                    onClick={onExit}
                    className="border-black-50 text-black-70 hover:bg-danger absolute top-[273px] left-1/2 flex h-[40px] w-[240px] -translate-x-1/2 cursor-pointer items-center justify-center rounded-[5px] border border-[0.63px] hover:border-none hover:text-white"
                >
                    <span className="text-18px-medium group-hover:text-white">중단하기</span>
                </button>
            </div>
        </div>
    );
};

// 실제 QuizExitModal export
export default QuizExitModal;
