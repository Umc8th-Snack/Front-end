import React, { useState } from 'react';

import GoogleIcon from '@/assets/GoogleIcon.svg?react';
import XIcon from '@/assets/XIcon.svg?react';
import SnackIcon from '@/shared/assets/snack.svg?react';
import { getGoogleAuthUrl } from '@/shared/utils/googleAuth';

import EmailLoginForm from './EmailLoginForm';
import EmailSignupForm from './EmailSignupForm';
import SignupCompleteForm from './SignupCompleteForm';
import SocialLoginButton from './SocialLoginButton';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ModalMode = 'social' | 'emailLogin' | 'emailSignup' | 'signupComplete';

const LoginModal = ({ isOpen, onClose }: ModalProps) => {
    const [modalMode, setModalMode] = useState<ModalMode>('social');
    if (!isOpen) return null;

    const handleEmailLoginClick = () => {
        setModalMode('emailLogin');
    };

    const handleEmailSignupClick = () => {
        setModalMode('emailSignup');
    };

    const handleSignupComplete = () => {
        setModalMode('signupComplete');
    };

    const handleGoogleLogin = () => {
        console.log('🔵 [LOGIN MODAL] Google 로그인 버튼 클릭');
        // Google OAuth 페이지로 리다이렉트
        window.location.href = getGoogleAuthUrl();
    };

    const handleClose = () => {
        // 모달 닫을 때 상태 초기화
        setModalMode('social');
        onClose();
    };

    const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
            handleClose();
        }
    };

    return (
        <div
            className="bg-black-50 fixed inset-0 z-50 flex items-center justify-center"
            onClick={handleClose}
            onKeyDown={handleOverlayKeyDown}
            tabIndex={-1}
            role="button"
            aria-label="Close modal"
        >
            <div
                className={`relative w-[440px] rounded-[15px] bg-white shadow-xl ${
                    modalMode === 'signupComplete' ? 'h-[484px]' : 'h-[640px]'
                }`}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                tabIndex={-1}
                role="button"
                aria-label="Modal content"
            >
                {/* 닫기 버튼 */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-gray-600"
                >
                    <XIcon />
                </button>

                {modalMode === 'social' && (
                    <>
                        <div className="mt-12 text-center">
                            <p className="text-36px-semibold text-black">스낵</p>
                            <p className="text-28px-medium mt-1 text-black">뉴스를 간식처럼,</p>
                        </div>

                        {/* 로고 */}
                        <div className="mt-18 flex justify-center">
                            <SnackIcon />
                        </div>

                        {/* 소셜 로그인 버튼 */}
                        <div className="text-20px-medium mt-18 flex flex-col items-center gap-4">
                            <SocialLoginButton
                                text="Google 로그인"
                                icon={<GoogleIcon />}
                                bgColor="bg-white"
                                textColor="text-black"
                                width="320px"
                                height="56px"
                                borderColor="border-[1px] border-gray-500"
                                onClick={handleGoogleLogin}
                            />

                            <SocialLoginButton
                                text="이메일 로그인"
                                bgColor="bg-main"
                                textColor="text-white"
                                width="320px"
                                height="56px"
                                borderColor="border-none"
                                onClick={handleEmailLoginClick}
                            />
                        </div>

                        {/* 하단 회원가입 안내 */}
                        <div className="text-black-30 text-18px-medium mt-15 flex items-center justify-center gap-4">
                            <span>아직 회원이 아니신가요?</span>
                            <button
                                className="cursor-pointer text-black hover:underline"
                                onClick={handleEmailSignupClick}
                            >
                                이메일로 회원가입
                            </button>
                        </div>
                    </>
                )}

                {modalMode === 'emailLogin' && <EmailLoginForm onClose={handleClose} />}

                {modalMode === 'emailSignup' && (
                    <EmailSignupForm onClose={handleClose} onSignupComplete={handleSignupComplete} />
                )}

                {modalMode === 'signupComplete' && <SignupCompleteForm onClose={handleClose} />}
            </div>
        </div>
    );
};

export default LoginModal;
