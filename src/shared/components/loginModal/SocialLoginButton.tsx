import React from 'react';

interface SocialLoginButtonProps {
    text: string;
    icon?: React.ReactNode;
    bgColor: string;
    textColor: string;
    onClick?: () => void;
    width: string;
    height: string;
}

const SocialLoginButton = ({ text, icon, bgColor, textColor, onClick, height, width }: SocialLoginButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`gap-10px flex items-center justify-center h-[${height}] w-[${width}] rounded-[8px] ${bgColor} ${textColor} cursor-pointer border-[1px] border-gray-500 transition hover:opacity-70`}
        >
            <span>{icon}</span>
            <span>{text}</span>
        </button>
    );
};

export default SocialLoginButton;
