import React from 'react';

interface SocialLoginButtonProps {
    text: string;
    icon?: React.ReactNode;
    bgColor: string;
    textColor: string;
    onClick?: () => void;
    width: string;
    height: string;
    borderColor?: string;
}

const SocialLoginButton = ({
    text,
    icon,
    bgColor,
    textColor,
    onClick,
    height,
    width,
    borderColor = 'border-none',
}: SocialLoginButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center gap-3 ${height} ${width} ${borderColor} rounded-[8px] ${bgColor} ${textColor} cursor-pointer transition hover:opacity-70`}
        >
            {icon && <span> {icon}</span>}
            <span>{text}</span>
        </button>
    );
};

export default SocialLoginButton;
