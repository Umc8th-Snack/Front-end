import React, { useState } from 'react';

import InputBox from '../../box/InputBox/InputBox';

interface EmailLoginFormProps {
    onClose: () => void;
}

const EmailLoginForm = ({ onClose }: EmailLoginFormProps) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLoginSubmit = () => {
        console.log('로그인 데이터:', formData);
        // TODO: 실제 로그인 API 호출
        onClose();
    };

    const isFormValid = formData.email.trim() && formData.password.trim();

    return (
        <>
            <div className="mt-12 text-center">
                <p className="text-36px-semibold text-black">스낵</p>
                <p className="text-28px-medium mt-1 text-black">뉴스를 간식처럼,</p>
            </div>

            {/* 입력 필드 */}
            <div className="mt-18 flex flex-col gap-2 px-12">
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

            {/* 비밀번호 찾기 */}
            <div className="text-18px-medium text-black-30 absolute right-0 bottom-[60px] left-0 text-center">
                <button className="cursor-pointer hover:underline">비밀번호를 잊으셨나요?</button>
            </div>

            {/* 로그인 버튼 */}
            <div className="absolute right-0 bottom-[135px] left-0 flex px-12">
                <button
                    onClick={handleLoginSubmit}
                    disabled={!isFormValid}
                    className={`text-20px-medium h-[56px] w-full rounded-md py-3 text-white ${
                        isFormValid ? 'bg-main cursor-pointer' : 'bg-black-30 cursor-not-allowed'
                    }`}
                >
                    로그인
                </button>
            </div>
        </>
    );
};

export default EmailLoginForm;
