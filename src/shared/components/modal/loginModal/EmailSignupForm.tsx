import React, { useState } from 'react';

import { isPasswordValid, validateNickname } from '@/shared/utils/validation';

import InputBox from '../../box/InputBox/InputBox';
import ErrorMessage from '../../message/ErrorMessage';

interface EmailSignupFormProps {
    onClose: () => void;
    onSignupComplete: () => void;
}

const EmailSignupForm = ({ onSignupComplete }: EmailSignupFormProps) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        nickname: '',
    });

    const [nicknameError, setNicknameError] = useState<string>('');

    const showPasswordError = formData.password.length > 0 && !isPasswordValid(formData.password);

    // 비밀번호 확인 검사
    const showPasswordMismatchError =
        formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // 닉네임 실시간 유효성 검사
        if (name === 'nickname') {
            const error = validateNickname(value);
            setNicknameError(error);
        }
    };

    const handleSignupSubmit = () => {
        console.log('회원가입 데이터:', formData);

        // 닉네임 중복 검사 (더미 데이터 - 실제로는 백엔드 API 호출)
        if (formData.nickname.trim() === '스내커') {
            setNicknameError('이미 사용중인 닉네임입니다.');
            return;
        }

        // TODO: 실제 회원가입 API 호출
        console.log('회원가입 성공!');
        onSignupComplete();
    };

    const isFormValid =
        formData.email.trim() &&
        isPasswordValid(formData.password) &&
        formData.confirmPassword.trim() &&
        formData.password === formData.confirmPassword &&
        formData.nickname.trim() &&
        nicknameError === '';

    return (
        <>
            {/* 타이틀 */}
            <div className="mt-12 text-center">
                <h2 className="text-28px-semibold text-black">회원가입</h2>
            </div>

            {/* 입력 필드 */}
            <div className="mt-5 flex flex-col gap-4 px-12">
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
                        id="password"
                        name="password"
                        placeholder="비밀번호를 입력해주세요"
                        type="password"
                        onChange={handleChange}
                        value={formData.password}
                        className="text-18px-medium hover:border-main focus:ring-main mt-1 w-full rounded-md border border-[#B2B2B2] px-4 py-3 transition placeholder:text-[#B2B2B2] focus:ring-1 focus:outline-none"
                    />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="confirmPassword" className="text-18px-medium text-black">
                            비밀번호 확인
                        </label>
                        {showPasswordMismatchError && <ErrorMessage message="비밀번호가 일치하지 않습니다." />}
                    </div>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="비밀번호를 다시 입력해주세요"
                        type="password"
                        onChange={handleChange}
                        value={formData.confirmPassword}
                        className="text-18px-medium hover:border-main focus:ring-main mt-1 w-full rounded-md border border-[#B2B2B2] px-4 py-3 transition placeholder:text-[#B2B2B2] focus:ring-1 focus:outline-none"
                    />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="nickname" className="text-18px-medium text-black">
                            닉네임
                        </label>
                        {nicknameError && <ErrorMessage message={nicknameError} />}
                    </div>
                    <input
                        id="nickname"
                        name="nickname"
                        placeholder="닉네임을 입력해주세요"
                        onChange={handleChange}
                        value={formData.nickname}
                        className="text-18px-medium hover:border-main focus:ring-main mt-1 w-full rounded-md border border-[#B2B2B2] px-4 py-3 transition placeholder:text-[#B2B2B2] focus:ring-1 focus:outline-none"
                    />
                </div>
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
