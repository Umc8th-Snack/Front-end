import React from 'react';

interface CircleShareButtonProps {
    icon: React.ReactNode;
    label: string;
    filled?: boolean;
    bgColor?: string;
    borderColor?: string;
    textColor?: string;
    onClick?: () => void;
}

function CircleShareButton({
    icon,
    label,
    filled = true,
    bgColor = 'bg-white',
    borderColor = '',
    textColor = 'text-black-70',
    onClick,
}: CircleShareButtonProps) {
    const filledStyle = `bg-white ${borderColor} border`;
    const finalStyle = filled ? bgColor : filledStyle;

    return (
        <div className="flex w-[72px] flex-col items-center sm:w-[91px]">
            <div
                className={`flex h-[80px] w-[80px] cursor-pointer items-center justify-center rounded-full sm:h-[91px] sm:w-[91px] ${finalStyle}`}
                onClick={onClick}
            >
                <div className="flex h-[36px] w-[36px] items-center justify-center sm:h-[44px] sm:w-[44px]">{icon}</div>
            </div>
            <span className={`text-14px-medium sm:text-18px-medium mt-[6px] ${textColor}`}>{label}</span>
        </div>
    );
}

export default CircleShareButton;
