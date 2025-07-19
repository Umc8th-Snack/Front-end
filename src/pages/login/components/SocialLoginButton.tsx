import React from 'react';

interface SocialLoginButtonProps {
    text: string;
    icon?: React.ReactNode;
    bgColor: string;
    textColor: string;
    onClick?: () => void;
}

const SocialLoginButton = ({ text, icon, bgColor, textColor, onClick }: SocialLoginButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`flex w-full items-center justify-center gap-2 rounded-md py-2 ${bgColor} ${textColor} cursor-pointer border border-gray-300 transition hover:opacity-70`}
        >
            <span>{icon}</span>
            <span className="text-sm font-medium">{text}</span>
        </button>
    );
};

export default SocialLoginButton;
