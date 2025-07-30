import React from 'react';

interface Props {
    icon: React.ReactNode;
    label: string;
    filled?: boolean;
    bgColor?: string; // ex: 'bg-kakao-yellow'
    borderColor?: string; // ex: 'border-naver-green'
    textColor?: string; // ex: 'text-black-70'
}

function CircleShareButton({
    icon,
    label,
    filled = true,
    bgColor = 'bg-white',
    borderColor = '',
    textColor = 'text-black-70',
}: Props) {
    const filledStyle = `bg-white ${borderColor} border`;
    const finalStyle = filled ? bgColor : filledStyle;

    return (
        <div className="flex w-[91px] flex-col items-center">
            <div className={`flex h-[91px] w-[91px] items-center justify-center rounded-full ${finalStyle}`}>
                {icon}
            </div>
            <span className={`text-18px-medium mt-[10px] ${textColor}`}>{label}</span>
        </div>
    );
}

export default CircleShareButton;
