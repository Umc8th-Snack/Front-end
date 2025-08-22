import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authApi } from '@/shared/apis/auth';

const VerifyCodePage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | React.ReactNode>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // 이메일 정보 가져오기 (sessionStorage)
    useEffect(() => {
        const savedEmail = sessionStorage.getItem('resetEmail');
        if (!savedEmail) {
            // 이메일 정보가 없으면 첫 페이지로
            void navigate('/forgot-password');
            return;
        }
        setEmail(savedEmail);
    }, [navigate]);

    const isFormValid = code.trim().length === 6; // 6자리 코드

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: { email: string; code: string }) => {
            return authApi.verifyPasswordResetCode(data.email, data.code);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid || isPending) return;

        setErrorMsg(null);
        setSuccessMsg(null);

        void mutateAsync({ email, code })
            .then(() => {
                setSuccessMsg('인증이 완료되었습니다.');
                // 서버가 토큰을 반환하지 않으므로 인증 완료 상태만 저장
                sessionStorage.setItem('verificationComplete', 'true');
                sessionStorage.setItem('verifiedCode', code);
                setTimeout(() => {
                    void navigate('/forgot-password/reset');
                }, 1500);
            })
            .catch((err: any) => {
                // 서버 에러 응답 구조에 따른 메시지 처리
                let errorMessage: string | React.ReactNode = '인증 코드 확인에 실패했습니다.';

                // axios 에러 응답에서 code와 message 확인
                const errorCode = err?.response?.data?.code;
                const serverMessage = err?.response?.data?.message;

                if (errorCode === 'USER_2671') {
                    // 인증코드 불일치
                    errorMessage = (
                        <>
                            인증 코드가 일치하지 않습니다.
                            <br />
                            이메일로 받은 6자리 숫자를 다시 확인해주세요.
                        </>
                    );
                } else if (errorCode === 'USER_2672') {
                    // 인증코드 만료
                    errorMessage = (
                        <>
                            인증 코드의 유효 시간이 만료되었습니다.
                            <br />
                            처음부터 다시 시도해주세요.
                        </>
                    );
                } else if (serverMessage) {
                    // 서버에서 보낸 다른 메시지가 있으면 사용
                    errorMessage = serverMessage;
                }

                setErrorMsg(errorMessage);
            });
    };

    return (
        <div className="mt-6 flex min-h-screen flex-col items-center px-10 sm:mt-10 sm:px-12">
            <h2 className="text-24px-semibold sm:text-32px-semibold">인증코드 확인</h2>
            <p className="sm:text-20px-medium text-16px-medium text-black-70 pt-1 text-center sm:pt-3">
                이메일로 전송된 인증코드를 입력해주세요
            </p>

            <form onSubmit={handleSubmit} className="mx-auto mt-8 w-full max-w-[432px] space-y-4 sm:space-y-6">
                {/* 이메일 표시 (읽기 전용) */}
                <div>
                    <label
                        htmlFor="email"
                        className="text-18px-medium sm:text-20px-medium block text-base md:text-left"
                    >
                        이메일
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="border-black-30 text-14px-medium sm:text-18px-medium mt-2 w-full cursor-not-allowed rounded-[8px] border bg-gray-50 px-3 py-2 outline-none"
                        value={email}
                        readOnly
                    />
                </div>

                {/* 인증코드 입력 */}
                <div>
                    <label htmlFor="code" className="text-18px-medium sm:text-20px-medium block text-base md:text-left">
                        인증코드
                    </label>
                    <input
                        id="code"
                        type="text"
                        maxLength={6}
                        className="hover:border-main focus:ring-main border-black-30 text-14px-medium sm:text-18px-medium placeholder-black-30 mt-2 w-full rounded-[8px] border px-3 py-2 outline-none focus:ring-1"
                        placeholder="6자리 인증코드 입력"
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} // 숫자만
                    />
                </div>

                {/* 에러/성공 메시지 */}
                {errorMsg && (
                    <p className="text-sm text-red-500" role="alert">
                        {errorMsg}
                    </p>
                )}
                {successMsg && (
                    <p className="text-sm text-green-600" role="status">
                        {successMsg}
                    </p>
                )}

                {/* 버튼 */}
                <button
                    type="submit"
                    disabled={!isFormValid || isPending}
                    className={`text-16px-medium sm:text-18px-medium mt-6 h-[55px] w-full rounded-[8px] py-2 text-white transition-colors sm:h-[60px] ${
                        isFormValid && !isPending
                            ? 'hover:bg-main cursor-pointer bg-blue-500'
                            : 'bg-black-30 cursor-not-allowed'
                    }`}
                >
                    {isPending ? '확인 중...' : '확인'}
                </button>
            </form>
        </div>
    );
};

export default VerifyCodePage;
