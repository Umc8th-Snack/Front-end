import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authApi } from '@/shared/apis/auth';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [isEmailSent, setIsEmailSent] = useState(false);

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isFormValid = emailRegex.test(email.trim());

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (email: string) => {
            return authApi.sendPasswordResetCode(email);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid || isPending) return;

        // 이미 이메일이 전송된 경우 다음 페이지로 이동
        if (isEmailSent) {
            void navigate('/forgot-password/verify');
            return;
        }

        setErrorMsg(null);
        setSuccessMsg(null);

        void mutateAsync(email)
            .then(() => {
                setSuccessMsg('인증 코드가 이메일로 전송되었습니다.');
                // 이메일 저장
                sessionStorage.setItem('resetEmail', email);
                // 전송 완료 상태로 변경
                setIsEmailSent(true);
            })
            .catch((err) => {
                const msg = err instanceof Error ? err.message : '이메일 전송에 실패했습니다. 다시 시도해주세요.';
                setErrorMsg(msg);
                setIsEmailSent(false);
            });
    };

    return (
        <div className="mt-6 flex min-h-screen flex-col items-center px-10 sm:mt-10 sm:px-12">
            <h2 className="text-24px-semibold sm:text-32px-semibold">비밀번호 찾기</h2>
            <p className="sm:text-20px-medium text-16px-medium text-black-70 pt-1 text-center sm:pt-3">
                입력하신 이메일 주소로 <br className="sm:hidden" />
                비밀번호를 재설정 할 수 있어요.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto mt-8 w-full max-w-[432px] space-y-4 sm:space-y-6">
                {/* 이메일 입력 */}
                <div>
                    <label
                        htmlFor="email"
                        className="text-18px-medium sm:text-20px-medium block pb-1 text-base md:text-left"
                    >
                        이메일
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="text-14px-medium sm:text-18px-medium hover:border-main focus:ring-main w-full rounded-lg border border-[#B2B2B2] px-3 py-3 transition placeholder:text-[#B2B2B2] focus:ring-1 focus:outline-none"
                        placeholder="이메일을 입력해주세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </div>

                {/* 에러/성공 메시지 */}
                {errorMsg && (
                    <p className="text-center text-sm text-red-500 md:text-left md:text-base" role="alert">
                        {errorMsg}
                    </p>
                )}
                {successMsg && (
                    <p className="text-center text-sm text-green-600 md:text-left md:text-base" role="status">
                        {successMsg}
                    </p>
                )}

                {/* 버튼 */}
                <div className="mt-8 mb-10 flex sm:mt-12">
                    <button
                        type="submit"
                        disabled={(!isFormValid && !isEmailSent) || isPending}
                        className={`text-16px-medium sm:text-18px-medium h-[55px] w-full rounded-lg py-3 text-white transition-colors sm:h-[60px] ${
                            (isFormValid || isEmailSent) && !isPending
                                ? 'hover:bg-main/70 bg-main cursor-pointer'
                                : 'bg-black-30 cursor-not-allowed'
                        }`}
                    >
                        {isPending ? '전송 중...' : isEmailSent ? '다음' : '전송'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
