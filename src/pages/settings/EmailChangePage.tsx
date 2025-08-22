import React, { useState } from 'react';

import { useChangeEmail } from '@/shared/hooks/useUser';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailChangePage = () => {
    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const isFormValid = emailRegex.test(newEmail.trim()) && currentPassword.trim().length > 0;
    const { mutateAsync, isPending } = useChangeEmail();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!isFormValid || isPending) return;

        setErrorMsg(null);
        setSuccessMsg(null);

        void mutateAsync({ newEmail: newEmail.trim(), currentPassword: currentPassword.trim() })
            .then(() => {
                setSuccessMsg(`이메일이 ${newEmail.trim()} 로 변경되었습니다.`);
                setNewEmail('');
                setCurrentPassword('');
            })
            .catch((err) => {
                const msg = err instanceof Error ? err.message : '이메일 변경 중 오류가 발생했습니다.';
                setErrorMsg(msg);
            });
    };

    return (
        <div className="mt-20 flex min-h-screen flex-col items-center px-4 sm:px-6">
            <h2 className="md:text-36px-semibold text-24px-semibold">이메일 변경</h2>
            <p className="md:text-24px-medium text-black-70 text-20px-medium">
                변경하실 새로운 이메일을 설정해 주세요.
            </p>

            <form className="mt-10 w-full max-w-[432px] space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="newEmail" className="md:text-24px-medium block text-base md:text-left">
                        새 이메일
                    </label>
                    <input
                        id="newEmail"
                        type="email"
                        className="border-black-30 placeholder-black-30 hover:border-main focus:ring-main md:text-24px-medium mt-2 h-12 w-full rounded-[8px] border px-3 py-2 text-base outline-none focus:ring-1 md:h-[68px]"
                        placeholder="새 이메일을 입력해 주세요"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        autoComplete="email"
                    />
                </div>

                <div>
                    <label htmlFor="currentPassword" className="md:text-24px-medium block text-base md:text-left">
                        현재 비밀번호
                    </label>
                    <input
                        id="currentPassword"
                        type="password"
                        className="border-black-30 placeholder-black-30 hover:border-main focus:ring-main md:text-24px-medium mt-2 h-12 w-full rounded-[8px] border px-3 py-2 text-base outline-none focus:ring-1 md:h-[68px]"
                        placeholder="현재 비밀번호를 입력해 주세요"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>

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

                <button
                    type="submit"
                    disabled={!isFormValid || isPending}
                    className={`md:text-24px-medium h-12 w-full rounded-[8px] py-2 text-base text-white transition-colors md:mt-6 md:h-[68px] ${
                        isFormValid && !isPending
                            ? 'hover:bg-main cursor-pointer bg-blue-500'
                            : 'bg-black-30 cursor-not-allowed'
                    }`}
                >
                    {isPending ? '변경 중...' : '이메일 변경'}
                </button>
            </form>
        </div>
    );
};

export default EmailChangePage;
