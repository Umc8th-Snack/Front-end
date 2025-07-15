// TODO: 라우팅 설정 후 QuizCompleteModal.tsx의 폴더상 위치 바꾸기

// TODO: 폴더 구조 설정 후 XIcon 위치 바꾸기, SVGR로 변경
import React, { useEffect, useRef, useState } from 'react';

import ThumbsUpIcon from '@/assets/thumbs-up.svg?react';

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
);

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

const QuizCompleteModal: React.FC<Props> = ({ onClose, onConfirm }) => {
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
            <div ref={modalRef} className="relative h-[350px] w-[350px] rounded-[9.375px] bg-white shadow-md">
                {/* 닫기 버튼 */}
                <button
                    className="absolute top-[8px] right-[8px] flex h-[22px] w-[22px] cursor-pointer items-center justify-center"
                    onClick={onClose}
                >
                    <XIcon className="text-black-70" />
                </button>

                {/* 메시지 */}
                <div className="text-24px-semibold absolute top-[14px] left-1/2 h-[108px] w-[211px] -translate-x-1/2">
                    퀴즈를 <br />
                    다 푸셨네요! <br />
                    정답을 확인해 볼까요?
                </div>

                {/* TODO: 폴더 구조 변경 후 thumbs-up.svg 위치 바꾸기 */}

                {/* 아이콘 영역 */}
                <div className="absolute top-[148px] left-1/2 flex -translate-x-1/2 flex-col items-center">
                    <ThumbsUpIcon className="h-[112px] w-[112px]" />
                </div>

                {/* 확인하러 가기 버튼 */}
                <button
                    onClick={onConfirm}
                    className="border-black-50 absolute top-[270px] left-1/2 flex h-[40px] w-[240px] -translate-x-1/2 cursor-pointer items-center justify-center rounded-[5px] border border-[0.63px]"
                >
                    <span className="text-18px-medium text-black-70">확인하러 가기</span>
                </button>
            </div>
        </div>
    );
};

// 임시 export
export default DummyQuizCompleteModal;

// 실제 사용 시:
// export default QuizCompleteModal;
