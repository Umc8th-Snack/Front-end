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
        <div className="mt-3 flex min-h-screen flex-col items-center px-10 sm:mt-10 sm:px-12">
            <h2 className="sm:text-32px-semibold text-24px-semibold">이메일 변경</h2>
            <p className="sm:text-20px-medium text-black-70 text-16px-medium">
                변경하실 새로운 이메일을 설정해 주세요.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto mt-8 w-full max-w-[432px] space-y-4 sm:space-y-6">
                <div>
                    <label
                        htmlFor="newEmail"
                        className="text-18px-medium sm:text-20px-medium block pb-1 text-base md:text-left"
                    >
                        새 이메일
                    </label>
                    <input
                        id="newEmail"
                        type="email"
                        className="text-14px-medium sm:text-18px-medium hover:border-main focus:ring-main w-full rounded-lg border border-[#B2B2B2] px-3 py-3 transition placeholder:text-[#B2B2B2] focus:ring-1 focus:outline-none"
                        placeholder="새 이메일을 입력해 주세요"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        autoComplete="email"
                    />
                </div>

                <div>
                    <label
                        htmlFor="currentPassword"
                        className="text-18px-medium sm:text-20px-medium block pb-1 text-base md:text-left"
                    >
                        현재 비밀번호
                    </label>
                    <input
                        id="currentPassword"
                        type="password"
                        className="text-14px-medium sm:text-18px-medium hover:border-main focus:ring-main w-full rounded-lg border border-[#B2B2B2] px-3 py-3 transition placeholder:text-[#B2B2B2] focus:ring-1 focus:outline-none"
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

                <div className="mt-8 mb-10 flex sm:mt-12 sm:mb-12">
                    <button
                        type="submit"
                        disabled={!isFormValid || isPending}
                        className={`text-16px-medium sm:text-18px-medium h-[55px] w-full rounded-lg py-3 text-white transition-colors sm:h-[60px] ${
                            isFormValid && !isPending
                                ? 'hover:bg-main bg-main cursor-pointer'
                                : 'bg-black-30 cursor-not-allowed'
                        }`}
                    >
                        {isPending ? '변경 중...' : '이메일 변경'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmailChangePage;
