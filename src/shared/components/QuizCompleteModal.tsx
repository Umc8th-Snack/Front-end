import React, { useEffect, useRef, useState } from 'react';

import XIcon from '@/shared/assets/icons/close-x.svg?react';
import ThumbsUpIcon from '@/shared/assets/icons/thumbs-up.svg?react';

interface Props {
    onClose: () => void;
    onConfirm: () => void;
}

const DummyQuizCompleteModal = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => setIsOpen(false);
    const handleConfirm = () => {
        alert('정답 확인하러 가기');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return <QuizCompleteModal onClose={handleClose} onConfirm={handleConfirm} />;
};

const QuizCompleteModal = ({ onClose, onConfirm }: Props) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={handleOverlayClick}>
            <div ref={modalRef} className="relative h-[350px] w-[350px] rounded-[10px] bg-white shadow-md">
                {/* 닫기 버튼 */}
                <button
                    className="absolute top-[12px] right-[8px] flex h-[22px] w-[22px] cursor-pointer items-center justify-center"
                    onClick={onClose}
                >
                    <XIcon className="text-black-70" />
                </button>

                {/* 메시지 */}
                <div className="text-24px-semibold absolute top-[35px] left-1/2 w-[240px] -translate-x-1/2 text-center">
                    퀴즈를 다 푸셨네요! <br />
                    정답을 확인해 볼까요?
                </div>

                {/* 아이콘 영역 */}
                <div className="absolute top-[130px] left-1/2 flex -translate-x-1/2 flex-col items-center">
                    <ThumbsUpIcon className="h-[112px] w-[112px]" />
                </div>

                {/* 확인하러 가기 버튼 */}
                <button
                    onClick={onConfirm}
                    className="border-black-50 text-black-70 hover:bg-main absolute top-[270px] left-1/2 flex h-[40px] w-[240px] -translate-x-1/2 cursor-pointer items-center justify-center rounded-[5px] border border-[0.63px] hover:border-none hover:text-white"
                >
                    <span className="text-18px-medium">확인하러 가기</span>
                </button>
            </div>
        </div>
    );
};

// 임시 export
export default DummyQuizCompleteModal;

// 실제 사용 시:
// export default QuizCompleteModal;
