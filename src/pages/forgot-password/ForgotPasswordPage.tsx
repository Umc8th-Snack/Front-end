import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// TODO: API import
// import { sendPasswordResetCode } from '@/shared/apis/auth';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isFormValid = emailRegex.test(email.trim());

    // TODO: 실제 API 연결
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (email: string) => {
            // return sendPasswordResetCode(email);
            console.log('Sending code to:', email);
            // 임시 응답
            return Promise.resolve();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid || isPending) return;

        setErrorMsg(null);
        setSuccessMsg(null);

        void mutateAsync(email)
            .then(() => {
                setSuccessMsg('인증 코드가 이메일로 전송되었습니다.');
                // 이메일 저장 후 다음 페이지로 이동
                sessionStorage.setItem('resetEmail', email);
                setTimeout(() => {
                    void navigate('/forgot-password/verify');
                }, 1500);
            })
            .catch((err) => {
                const msg = err instanceof Error ? err.message : '이메일 전송에 실패했습니다. 다시 시도해주세요.';
                setErrorMsg(msg);
            });
    };

    return (
        <div className="mt-20 flex min-h-screen flex-col items-center">
            <h2 className="text-36px-semibold">비밀번호 찾기</h2>
            <p className="text-24px-medium text-black-70">입력하신 이메일 주소로 비밀번호를 재설정 할 수 있어요.</p>

            <form onSubmit={handleSubmit} className="mt-12 w-[432px] space-y-6">
                {/* 이메일 입력 */}
                <div>
                    <label htmlFor="email" className="text-24px-medium">
                        이메일
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="hover:border-main focus:ring-main border-black-30 text-24px-medium placeholder-black-30 mt-2 h-[68px] w-full rounded-[8px] border px-3 py-2 outline-none focus:ring-1"
                        placeholder="이메일을 입력해주세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
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
                    {isPending ? '전송 중...' : '전송'}
                </button>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
