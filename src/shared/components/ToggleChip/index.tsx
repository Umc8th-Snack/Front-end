import React, { useState } from 'react';

interface ChipProps {
    label: string;
}

const ToggleChip: React.FC<ChipProps> = ({ label }) => {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        setSelected((prev) => !prev);
    };

    return (
        <button
            className={`text-18px-medium m-2 h-[40px] w-[100px] cursor-pointer rounded-full ${selected ? 'bg-main text-white' : 'border border-black bg-white text-black'} transition hover:opacity-80`}
            onClick={handleClick}
        >
            {label}
        </button>
    );
};

export default ToggleChip;

{
    /* 
    <ToggleChip label="사회" />
    <ToggleChip label="경제" /> 
    */
}
