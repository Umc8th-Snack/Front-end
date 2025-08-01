import React, { useState } from 'react';

import GoogleIcon from '@/assets/GoogleIcon.svg?react';
import XIcon from '@/assets/XIcon.svg?react';
import SnackIcon from '@/shared/assets/snack.svg?react';

import InputBox from '../../box/InputBox/InputBox';
import SocialLoginButton from './SocialLoginButton';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: ModalProps) => {
    const [isEmailLoginMode, setIsEmailLoginMode] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    if (!isOpen) return null;

    const handleEmailLoginClick = () => {
        setIsEmailLoginMode(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleClose = () => {
        // 모달 닫을 때 상태 초기화
        setIsEmailLoginMode(false);
        setFormData({ email: '', password: '' });
        onClose();
    };

    const handleLoginSubmit = () => {
        console.log('로그인 데이터:', formData);
        // TODO: 실제 로그인 API 호출
        handleClose();
    };

    const isFormValid = formData.email.trim() && formData.password.trim();

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
                className="absolute h-[640px] w-[440px] rounded-[15px] bg-white shadow-xl"
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

                {!isEmailLoginMode ? (
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
                            />

                            <SocialLoginButton
                                text="이메일 로그인"
                                bgColor="bg-main"
                                textColor="text-white"
                                width="320px"
                                height="56px"
                                onClick={handleEmailLoginClick}
                            />
                        </div>

                        {/* 하단 회원가입 안내 */}
                        <div className="text-black-30 text-18px-medium mt-15 flex items-center justify-center gap-4">
                            <span>아직 회원이 아니신가요?</span>
                            <button className="cursor-pointer text-black hover:underline">이메일로 회원가입</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mt-12 text-center">
                            <p className="text-36px-semibold text-black">스낵</p>
                            <p className="text-28px-medium mt-1 text-black">뉴스를 간식처럼,</p>
                        </div>

                        {/* 이메일 로그인 폼 */}
                        <div className="mt-18 px-12">
                            {/* 입력 필드 */}
                            <div className="flex flex-col gap-2">
                                <InputBox
                                    label="이메일"
                                    name="email"
                                    placeholder="이메일을 입력해주세요"
                                    onChange={handleChange}
                                    value={formData.email}
                                />
                                <InputBox
                                    label="비밀번호"
                                    name="password"
                                    placeholder="비밀번호를 입력해주세요"
                                    type="password"
                                    onChange={handleChange}
                                    value={formData.password}
                                />
                            </div>

                            {/* 로그인 버튼 */}
                            <div className="flex">
                                <button
                                    onClick={handleLoginSubmit}
                                    disabled={!isFormValid}
                                    className={`text-20px-medium mt-8 h-[56px] w-full rounded-md py-3 text-white ${
                                        isFormValid ? 'bg-main cursor-pointer' : 'bg-black-30 cursor-not-allowed'
                                    }`}
                                >
                                    로그인
                                </button>
                            </div>

                            {/* 비밀번호 찾기 */}
                            <div className="text-black-30 text-16px-medium mt-4 text-center">
                                <button className="cursor-pointer text-gray-600 hover:underline">
                                    비밀번호를 잊으셨나요?
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginModal;
