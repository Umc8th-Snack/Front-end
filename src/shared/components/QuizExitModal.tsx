// TODO: 폴더 구조 설정 후 XIcon 위치 바꾸기
import React, { useEffect, useRef, useState } from 'react';

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
);

interface Props {
    onClose: () => void;
    onContinue: () => void;
    onExit: () => void;
}

// TODO: 아래 코드는 임시 기본 핸들러
// 라우팅 설정 후 실제 로직으로 변경하기
const DummyQuizExitModal = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        console.log('모달 닫기');
        setIsOpen(false);
    };

    const handleContinue = () => {
        alert('퀴즈 이어풀기');
        setIsOpen(false);
    };

    const handleExit = () => {
        alert('퀴즈 중단하기');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return <QuizExitModal onClose={handleClose} onContinue={handleContinue} onExit={handleExit} />;
};

function QuizExitModal({ onClose, onContinue, onExit }: Props) {
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
            <div ref={modalRef} className="relative h-[350px] w-[350px] rounded-[9.375px] bg-white shadow-md">
                {/* 닫기 버튼 */}
                <button
                    className="absolute top-[8px] right-[8px] flex h-[22px] w-[22px] cursor-pointer items-center justify-center"
                    onClick={onClose}
                >
                    <XIcon className="text-black-70" />
                </button>

                {/* 문구 */}
                <div className="text-28px-semibold absolute top-[35px] left-1/2 h-[126px] w-[245px] -translate-x-1/2">
                    잠깐, <br />
                    아직 풀지 못한 문제가 <br />
                    남았어요!
                </div>

                {/* 브라우저 해상도, 기기에 따라 버튼 border 굵기가 1px로 반올림되어 렌더링될 수 있음 */}
                {/* 이어풀기 */}
                <button
                    onClick={onContinue}
                    className="border-black-50 absolute top-[209px] left-1/2 flex h-[40px] w-[240px] -translate-x-1/2 cursor-pointer items-center justify-center rounded-[5px] border border-[0.63px]"
                >
                    <span className="text-18px-medium text-black-70">이어풀기</span>
                </button>

                {/* 중단하기 */}
                <button
                    onClick={onExit}
                    className="border-black-50 absolute top-[273px] left-1/2 flex h-[40px] w-[240px] -translate-x-1/2 cursor-pointer items-center justify-center rounded-[5px] border border-[0.63px]"
                >
                    <span className="text-18px-medium text-black-70">중단하기</span>
                </button>
            </div>
        </div>
    );
}

// 임시 export:
export default DummyQuizExitModal;

// TODO: 실제 사용 시 밑의 코드로 변경하기
// export default QuizExitModal;
