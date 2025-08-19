import { useState } from 'react';

import PenIcon from '@/shared/assets/icons/pen.svg?react';

interface FloatingMemoButtonProps {
    onClick: () => void;
    isActive?: boolean;
}

const FloatingMemoButton = ({ onClick, isActive = false }: FloatingMemoButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`fixed bottom-6 left-6 z-40 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full shadow-lg transition-all duration-300 lg:hidden ${
                isActive
                    ? 'bg-main shadow-main/30 text-white'
                    : 'text-main border-main-30 border-1 bg-white shadow-black/10 hover:shadow-black/20'
            }`}
            aria-label="메모장 열기"
        >
            <PenIcon className={`h-5 w-5 transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`} />
        </button>
    );
};

export default FloatingMemoButton;
