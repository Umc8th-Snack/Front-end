import React, { useState } from 'react';

import InputBox from '../../box/InputBox/InputBox';
import ErrorMessage from '../../message/ErrorMessage';

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

    // 비밀번호 유효성 검사 함수
    const isPasswordValid = (password: string) => {
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const isLongEnough = password.length >= 8;
        return hasLetter && hasNumber && isLongEnough;
    };

    const showPasswordError = formData.password.length > 0 && !isPasswordValid(formData.password);

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
        isPasswordValid(formData.password) &&
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
            <div className="mt-5 flex flex-col gap-2 px-12">
                <InputBox
                    label="이메일"
                    name="email"
                    placeholder="이메일을 입력해주세요"
                    onChange={handleChange}
                    value={formData.email}
                />
                <div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="password" className="text-18px-medium text-black">
                            비밀번호
                        </label>
                        {showPasswordError && (
                            <ErrorMessage message="비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요." />
                        )}
                    </div>
                    <input
                        name="password"
                        placeholder="비밀번호를 입력해주세요"
                        type="password"
                        onChange={handleChange}
                        value={formData.password}
                        className="text-18px-medium hover:border-main focus:ring-main mt-2 w-full rounded-md border border-[#B2B2B2] px-4 py-3 transition placeholder:text-[#B2B2B2] focus:ring-1 focus:outline-none"
                    />
                </div>
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
            <div className="mt-6 flex px-12">
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
