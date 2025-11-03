import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LOGIN_PROVIDER_HINT_KEY } from '@/shared/constants/authConstants';
import { useAuth } from '@/shared/context/AuthContext';
import { useLogin } from '@/shared/hooks/useAuth';

import InputBox from '../../box/InputBox/InputBox';

interface EmailLoginFormProps {
    onClose: () => void;
}

const EmailLoginForm = ({ onClose }: EmailLoginFormProps) => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { mutate: loginMutate, isPending, error } = useLogin();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLoginSubmit = () => {
        if (!isFormValid || isPending) return;

        console.log('📝 [LOGIN FORM] 로그인 폼 제출 시작');

        loginMutate(formData, {
            onSuccess: (response) => {
                console.log('✅ [LOGIN FORM] 로그인 API 성공:', response);

                if (response.token) {
                    console.log('🔐 [LOGIN FORM] AuthContext login 호출');
                    sessionStorage.removeItem(LOGIN_PROVIDER_HINT_KEY);
                    login(response.token, response.data, 'email');
                } else {
                    console.error('❌ [LOGIN FORM] Access Token을 찾을 수 없습니다.');
                }

                console.log('❌ [LOGIN FORM] 모달 닫기');
                onClose();
            },
            onError: (error) => {
                console.error('❌ [LOGIN FORM] 로그인 실패:', error);
            },
        });
    };

    const handleForgotPasswordClick = () => {
        onClose();
        void navigate('/forgot-password');
    };

    const isFormValid = formData.email.trim() && formData.password.trim();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleLoginSubmit();
        }
    };

    return (
        <>
            <div className="mt-12 text-center">
                <p className="text-32px-semibold sm:text-36px-semibold text-black">스낵</p>
                <p className="text-24px-medium sm:text-28px-medium mt-1 text-black">뉴스를 간식처럼,</p>
            </div>

            {/* 입력 필드 */}
            <div className="mt-3 flex flex-col gap-2 px-10 sm:mt-6 sm:px-12" onKeyDown={handleKeyDown}>
                <InputBox
                    label="이메일"
                    name="email"
                    placeholder="이메일을 입력해 주세요"
                    onChange={handleChange}
                    value={formData.email}
                />
                <div className="mt-2 sm:mt-3"></div>
                <InputBox
                    label="비밀번호"
                    name="password"
                    placeholder="비밀번호를 입력해 주세요"
                    type="password"
                    onChange={handleChange}
                    value={formData.password}
                />
                {error && (
                    <div className="mt-2 px-2 text-sm text-red-500">
                        로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.
                    </div>
                )}
            </div>

            {/* 로그인 버튼 */}
            <div className="mt-8 mb-6 flex px-10 sm:mt-12 sm:px-12">
                <button
                    onClick={handleLoginSubmit}
                    disabled={!isFormValid || isPending}
                    className={`text-18px-medium h-[50px] w-full rounded-md py-3 text-white transition hover:opacity-70 ${
                        isFormValid && !isPending ? 'bg-main cursor-pointer' : 'bg-black-30 cursor-not-allowed'
                    }`}
                >
                    {isPending ? '로그인 중...' : '로그인'}
                </button>
            </div>

            {/* 비밀번호 찾기 */}
            <div className="text-black-30 text-14px-medium mb-6 text-center">
                <button className="cursor-pointer hover:underline" onClick={handleForgotPasswordClick}>
                    비밀번호를 잊으셨나요?
                </button>
            </div>
        </>
    );
};

export default EmailLoginForm;
