import React, { useState } from 'react';

import InputBox from '../../box/InputBox/InputBox';
import BaseModal from '../BaseModal/BaseModal';

interface SignupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: { email: string; password: string; confirmPassword: string; nickname: string }) => void;
}

const DummySignupModal = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        console.log('회원가입 모달 닫기');
        setIsOpen(false);
    };

    const handleSubmit = (formData: { email: string; password: string; confirmPassword: string; nickname: string }) => {
        console.log('회원가입 데이터:', formData);
        setIsOpen(false);
    };

    return <SignupModal isOpen={isOpen} onClose={handleClose} onSubmit={handleSubmit} />;
};

const SignupModal = ({ isOpen, onClose, onSubmit }: SignupModalProps) => {
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

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} width="440px" height="640px" borderRadius="15px">
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
                <InputBox label="닉네임" name="nickname" placeholder="닉네임을 입력해주세요" onChange={handleChange} />
            </div>

            {/* 회원가입 버튼 */}
            <div className="">
                <button
                    onClick={handleSubmitClick}
                    disabled={!isFormValid}
                    className={`text-20px-medium mt-5 h-[56px] w-full cursor-pointer rounded-md py-3 text-white ${
                        isFormValid ? 'bg-main' : 'bg-black-30'
                    }`}
                >
                    회원가입
                </button>
            </div>
        </BaseModal>
    );
};

export default DummySignupModal;
