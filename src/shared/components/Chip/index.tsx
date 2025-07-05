import React from 'react';

interface ChipProps {
    label: string;
    selected: boolean;
    onClick: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, selected, onClick }) => {
    return (
        <button
            className={`h-[40px] w-[100px] cursor-pointer rounded-full text-sm font-medium ${selected ? 'bg-[#0066FF] text-white' : 'border border-black bg-white text-black'} transition hover:opacity-80`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Chip;
