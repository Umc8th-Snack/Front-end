import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// TODO: API import
// import { setNewPassword } from '@/shared/apis/auth';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // 이메일과 토큰 정보 가져오기 (sessionStorage)
    useEffect(() => {
        const savedEmail = sessionStorage.getItem('resetEmail');
        const savedToken = sessionStorage.getItem('resetToken');

        if (!savedEmail || !savedToken) {
            // 정보가 없으면 처음부터 다시
            void navigate('/forgot-password');
            return;
        }
        setEmail(savedEmail);
    }, [navigate]);

    const isFormValid = newPassword.trim() !== '' && confirmPassword.trim() !== '' && newPassword === confirmPassword;

    // TODO: 실제 API 연결
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: { email: string; newPassword: string; confirmPassword: string }) => {
            // return setNewPassword(data);
            console.log('Setting new password:', data);
            // 임시 응답
            return Promise.resolve();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid || isPending) return;

        setErrorMsg(null);
        setSuccessMsg(null);

        void mutateAsync({ email, newPassword, confirmPassword })
            .then(() => {
                setSuccessMsg('비밀번호가 성공적으로 변경되었습니다.');
                // sessionStorage 정리
                sessionStorage.removeItem('resetEmail');
                sessionStorage.removeItem('resetToken');
                // 로그인 페이지로 이동
                setTimeout(() => {
                    void navigate('/');
                }, 2000);
            })
            .catch((err) => {
                const msg = err instanceof Error ? err.message : '비밀번호 변경에 실패했습니다. 다시 시도해주세요.';
                setErrorMsg(msg);
            });
    };

    return (
        <div className="mt-20 flex min-h-screen flex-col items-center">
            <h2 className="text-36px-semibold">새 비밀번호 설정</h2>
            <p className="text-24px-medium text-black-70">새로운 비밀번호를 입력해주세요</p>

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

                {/* 새 비밀번호 */}
                <div>
                    <label htmlFor="newPassword" className="text-24px-medium">
                        새 비밀번호
                    </label>
                    <input
                        id="newPassword"
                        type="password"
                        className="hover:border-main focus:ring-main border-black-30 text-24px-medium placeholder-black-30 mt-2 h-[68px] w-full rounded-[8px] border px-3 py-2 outline-none focus:ring-1"
                        placeholder="새 비밀번호를 입력해주세요"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                {/* 비밀번호 확인 */}
                <div>
                    <label htmlFor="confirmPassword" className="text-24px-medium">
                        비밀번호 확인
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        className="hover:border-main focus:ring-main border-black-30 text-24px-medium placeholder-black-30 mt-2 h-[68px] w-full rounded-[8px] border px-3 py-2 outline-none focus:ring-1"
                        placeholder="비밀번호를 다시 입력해주세요"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPassword && newPassword !== confirmPassword && (
                        <p className="mt-2 text-sm text-red-500">비밀번호가 일치하지 않습니다.</p>
                    )}
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
                    {isPending ? '변경 중...' : '비밀번호 변경'}
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;
