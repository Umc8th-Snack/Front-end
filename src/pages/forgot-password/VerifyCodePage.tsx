import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authApi } from '@/shared/apis/auth';

const VerifyCodePage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
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
            .then((result) => {
                setSuccessMsg('인증이 완료되었습니다.');
                // 토큰 저장 후 다음 페이지로 이동
                sessionStorage.setItem('resetToken', result.verificationToken);
                setTimeout(() => {
                    void navigate('/forgot-password/reset');
                }, 1500);
            })
            .catch((err) => {
                // 에러 메시지를 더 구체적으로 표시
                let errorMessage = '인증 코드가 올바르지 않습니다. 다시 확인해주세요.';

                if (err instanceof Error) {
                    // API에서 반환한 구체적인 에러 메시지가 있으면 사용
                    if (err.message.includes('expired') || err.message.includes('만료')) {
                        errorMessage = '인증 코드가 만료되었습니다. 이메일을 다시 요청해주세요.';
                    } else if (err.message.includes('invalid') || err.message.includes('유효하지')) {
                        errorMessage = '잘못된 인증 코드입니다. 6자리 숫자를 다시 확인해주세요.';
                    } else if (err.message.includes('not found') || err.message.includes('찾을 수 없')) {
                        errorMessage = '인증 요청을 찾을 수 없습니다. 처음부터 다시 시도해주세요.';
                    } else if (err.message) {
                        // 서버에서 보낸 메시지가 있으면 그대로 사용
                        errorMessage = err.message;
                    }
                }

                setErrorMsg(errorMessage);
            });
    };

    return (
        <div className="mt-20 flex min-h-screen flex-col items-center">
            <h2 className="text-36px-semibold">인증코드 확인</h2>
            <p className="text-24px-medium text-black-70">이메일로 전송된 인증코드를 입력해주세요</p>

            <form onSubmit={handleSubmit} className="mt-12 w-[432px] space-y-6">
                {/* 이메일 표시 (읽기 전용) */}
                <div>
                    <label htmlFor="email" className="text-24px-medium">
                        이메일
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="border-black-30 text-24px-medium mt-2 h-[68px] w-full cursor-not-allowed rounded-[8px] border bg-gray-50 px-3 py-2 outline-none"
                        value={email}
                        readOnly
                    />
                </div>

                {/* 인증코드 입력 */}
                <div>
                    <label htmlFor="code" className="text-24px-medium">
                        인증코드
                    </label>
                    <input
                        id="code"
                        type="text"
                        maxLength={6}
                        className="hover:border-main focus:ring-main border-black-30 text-24px-medium placeholder-black-30 mt-2 h-[68px] w-full rounded-[8px] border px-3 py-2 outline-none focus:ring-1"
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
                    className={`text-24px-medium mt-6 h-[68px] w-full rounded-[8px] py-2 text-white transition-colors ${
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
