import React, { useEffect, useRef, useState } from 'react';

import XIcon from '@/shared/assets/icons/close-x.svg?react';

import InputBox from '../../box/InputBox/InputBox';

interface SignupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: { email: string; password: string; confirmPassword: string; nickname: string }) => void;
}

const DummySignupModal = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => setIsOpen(false);

    const handleSubmit = (formData: { email: string; password: string; confirmPassword: string; nickname: string }) => {
        console.log('회원가입 데이터:', formData);
        setIsOpen(false);
    };

    return <SignupModal isOpen={isOpen} onClose={handleClose} onSubmit={handleSubmit} />;
};

const SignupModal = ({ isOpen, onClose, onSubmit }: SignupModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        nickname: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitClick = () => {
        onSubmit(formData);
    };

    const isFormValid =
        formData.email.trim() &&
        formData.password.trim() &&
        formData.confirmPassword.trim() &&
        formData.password === formData.confirmPassword &&
        formData.nickname.trim();

    // ESC 닫기
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            role="button"
            tabIndex={0}
            aria-label="모달 닫기"
            onClick={handleOverlayClick}
            onKeyDown={handleOverlayKeyDown}
        >
            <div
                ref={modalRef}
                className="relative h-[640px] w-[440px] rounded-[15px] bg-white p-12 shadow-[0px_2.5px_2.5px_rgba(0,0,0,0.25)]"
            >
                {/* 닫기 버튼 */}
                <button
                    type="button"
                    aria-label="Close modal"
                    className="absolute top-[12px] right-[8px] flex h-8 w-8 cursor-pointer items-center justify-center"
                    onClick={onClose}
                >
                    <XIcon className="h-6 w-6" />
                </button>

                {/* 타이틀 */}
                <h2 className="text-28px-semibold pb-6 text-center">회원가입</h2>

                {/* 입력 필드 */}
                <div className="flex flex-col gap-1 pb-2">
                    <InputBox label="이메일" name="email" placeholder="이메일을 입력해주세요" onChange={handleChange} />
                    <InputBox
                        label="비밀번호"
                        name="password"
                        placeholder="비밀번호를 입력해주세요"
                        type="password"
                        onChange={handleChange}
                    />
                    <InputBox
                        label="비밀번호 확인"
                        name="confirmPassword"
                        placeholder="비밀번호를 다시 입력해주세요"
                        type="password"
                        onChange={handleChange}
                    />
                    <InputBox
                        label="닉네임"
                        name="nickname"
                        placeholder="닉네임을 입력해주세요"
                        onChange={handleChange}
                    />
                </div>

                {/* 회원가입 버튼 */}
                <div className="flex">
                    <button
                        onClick={handleSubmitClick}
                        disabled={!isFormValid}
                        className={`text-20px-medium mt-5 h-[56px] w-full rounded-md py-3 text-white ${
                            isFormValid ? 'bg-main cursor-pointer' : 'bg-black-30 cursor-not-allowed'
                        }`}
                    >
                        회원가입
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DummySignupModal;
