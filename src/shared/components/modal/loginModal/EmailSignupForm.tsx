import React, { useState } from 'react';

import { useSignup } from '@/shared/hooks/useAuth';
import { isPasswordValid, validateNickname } from '@/shared/utils/validation';

import InputBox from '../../box/InputBox/InputBox';
import ErrorMessage from '../../message/ErrorMessage';

interface EmailSignupFormProps {
    onClose: () => void;
    onSignupComplete: () => void;
}

const EmailSignupForm = ({ onSignupComplete }: EmailSignupFormProps) => {
    const { mutate: signupMutate, isPending, error } = useSignup();

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
        if (!isFormValid || isPending) return;

        console.log('📝 [SIGNUP FORM] 회원가입 폼 제출 시작');

        // confirmPassword는 API 호출에서 제외
        const { confirmPassword: _, ...signupData } = formData;

        signupMutate(signupData, {
            onSuccess: (response) => {
                console.log('✅ [SIGNUP FORM] 회원가입 API 성공:', response);
                console.log('🎉 [SIGNUP FORM] 회원가입 완료 화면으로 이동');
                onSignupComplete();
            },
            onError: (error) => {
                console.error('❌ [SIGNUP FORM] 회원가입 실패:', error);

                // 에러 메시지에 따른 닉네임 에러 처리
                const errorMessage = (error as any)?.response?.data?.message || '';
                if (errorMessage.includes('닉네임') || errorMessage.includes('nickname')) {
                    setNicknameError('이미 사용중인 닉네임입니다.');
                }
            },
        });
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
            <div className="mt-10 flex justify-center">
                <h2 className="text-28px-semibold text-black">회원가입</h2>
            </div>

            {/* 입력 필드 */}
            <div className="mt-3 flex flex-col px-10 sm:mt-6 sm:px-12">
                <InputBox
                    label="이메일"
                    name="email"
                    placeholder="이메일을 입력해 주세요"
                    onChange={handleChange}
                    value={formData.email}
                />
                <div>
                    <div className="mt-3 flex items-center sm:mt-4">
                        <label htmlFor="password" className="text-16px-medium text-black">
                            비밀번호
                        </label>
                        {showPasswordError && (
                            <ErrorMessage message="비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요." />
                        )}
                    </div>
                    <input
                        id="password"
                        name="password"
                        placeholder="비밀번호를 입력해 주세요"
                        type="password"
                        onChange={handleChange}
                        value={formData.password}
                        className="text-14px-medium sm:text-16px-medium hover:border-main focus:ring-main w-full rounded-md border border-[#B2B2B2] px-3 py-3 transition placeholder:text-[#B2B2B2] focus:ring-1 focus:outline-none"
                    />
                </div>
                <div>
                    <div className="mt-3 flex items-center sm:mt-4">
                        <label htmlFor="confirmPassword" className="text-16px-medium text-black">
                            비밀번호 확인
                        </label>
                        {showPasswordMismatchError && <ErrorMessage message="비밀번호가 일치하지 않습니다." />}
                    </div>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="비밀번호를 다시 입력해 주세요"
                        type="password"
                        onChange={handleChange}
                        value={formData.confirmPassword}
                        className="text-14px-medium sm:text-16px-medium sm:text-16px-medium hover:border-main focus:ring-main w-full rounded-md border border-[#B2B2B2] px-3 py-3 transition placeholder:text-[#B2B2B2] focus:ring-1 focus:outline-none"
                    />
                </div>
                <div>
                    <div className="mt-3 flex items-center sm:mt-4">
                        <label htmlFor="nickname" className="text-16px-medium text-black">
                            닉네임
                        </label>
                        {nicknameError && <ErrorMessage message={nicknameError} />}
                    </div>
                    <input
                        id="nickname"
                        name="nickname"
                        placeholder="닉네임을 입력해 주세요"
                        onChange={handleChange}
                        value={formData.nickname}
                        className="text-14px-medium sm:text-16px-medium hover:border-main focus:ring-main w-full rounded-md border border-[#B2B2B2] px-3 py-3 transition placeholder:text-[#B2B2B2] focus:ring-1 focus:outline-none"
                    />
                </div>
                {error && (
                    <div className="mt-2 px-2 text-sm text-red-500">
                        회원가입에 실패했습니다. 입력 정보를 확인해 주세요.
                    </div>
                )}
            </div>

            {/* 회원가입 버튼 */}
            <div className="mt-6 mb-12 flex px-10 sm:mt-8 sm:px-12">
                <button
                    onClick={handleSignupSubmit}
                    disabled={!isFormValid || isPending}
                    className={`text-18px-medium h-[50px] w-full rounded-md py-3 text-white ${
                        isFormValid && !isPending ? 'bg-main cursor-pointer' : 'bg-black-30 cursor-not-allowed'
                    }`}
                >
                    {isPending ? '회원가입 중...' : '회원가입'}
                </button>
            </div>
        </>
    );
};

export default EmailSignupForm;
