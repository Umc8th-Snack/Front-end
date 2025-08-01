import React, { useState } from 'react';

import InputBox from '../../box/InputBox/InputBox';

interface EmailSignupFormProps {
    onClose: () => void;
}

const EmailSignupForm = ({ onClose }: EmailSignupFormProps) => {
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

    const handleSignupSubmit = () => {
        console.log('회원가입 데이터:', formData);
        // TODO: 실제 회원가입 API 호출
        onClose();
    };

    const isFormValid =
        formData.email.trim() &&
        formData.password.trim() &&
        formData.confirmPassword.trim() &&
        formData.password === formData.confirmPassword &&
        formData.nickname.trim();

    return (
        <>
            {/* 타이틀 */}
            <div className="mt-12 text-center">
                <h2 className="text-28px-semibold text-black">회원가입</h2>
            </div>

            {/* 입력 필드 */}
            <div className="mt-16 flex flex-col gap-2 px-12">
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
                <InputBox
                    label="비밀번호 확인"
                    name="confirmPassword"
                    placeholder="비밀번호를 다시 입력해주세요"
                    type="password"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                />
                <InputBox
                    label="닉네임"
                    name="nickname"
                    placeholder="닉네임을 입력해주세요"
                    onChange={handleChange}
                    value={formData.nickname}
                />
            </div>

            {/* 회원가입 버튼 */}
            <div className="mt-8 flex px-12">
                <button
                    onClick={handleSignupSubmit}
                    disabled={!isFormValid}
                    className={`text-20px-medium h-[56px] w-full rounded-md py-3 text-white ${
                        isFormValid ? 'bg-main cursor-pointer' : 'bg-black-30 cursor-not-allowed'
                    }`}
                >
                    회원가입
                </button>
            </div>
        </>
    );
};

export default EmailSignupForm;
