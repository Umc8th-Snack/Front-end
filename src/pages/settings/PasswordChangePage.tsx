import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

import { authApi } from '@/shared/apis/auth';

const PasswordChangePage = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const isFormValid =
        currentPassword.trim() !== '' &&
        newPassword.trim() !== '' &&
        confirmPassword.trim() !== '' &&
        newPassword === confirmPassword;

    const { mutateAsync, isPending } = useMutation({
        mutationFn: authApi.changePassword,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid || isPending) return;

        setErrorMsg(null);
        setSuccessMsg(null);

        void mutateAsync({ currentPassword, newPassword, confirmPassword })
            .then(() => {
                setSuccessMsg('비밀번호가 성공적으로 변경되었습니다.');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            })
            .catch((err) => {
                const msg =
                    err instanceof Error ? err.message : '비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인해주세요.';
                setErrorMsg(msg);
            });
    };

    return (
        <div className="mt-3 flex min-h-screen flex-col items-center px-10 sm:mt-10 sm:px-12">
            <h2 className="sm:text-32px-semibold text-24px-semibold">비밀번호 변경</h2>
            <p className="sm:text-20px-medium text-black-70 text-16px-medium text-base">
                변경하실 새로운 비밀번호를 설정해 주세요.
            </p>

            <form onSubmit={onSubmit} className="mx-auto mt-8 w-full max-w-[432px] space-y-4 sm:space-y-6">
                <div>
                    <label
                        htmlFor="current"
                        className="text-18px-medium sm:text-20px-medium block pb-1 text-base md:text-left"
                    >
                        현재 비밀번호
                    </label>
                    <input
                        id="current"
                        type="password"
                        className="text-14px-medium sm:text-18px-medium hover:border-main focus:ring-main w-full rounded-lg border border-[#B2B2B2] px-3 py-3 transition placeholder:text-[#B2B2B2] focus:ring-1 focus:outline-none"
                        placeholder="현재 비밀번호를 입력해 주세요"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="text-18px-medium sm:text-20px-medium block pb-1 text-base md:text-left"
                    >
                        새 비밀번호
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="text-14px-medium sm:text-18px-medium hover:border-main focus:ring-main w-full rounded-lg border border-[#B2B2B2] px-3 py-3 transition placeholder:text-[#B2B2B2] focus:ring-1 focus:outline-none"
                        placeholder="새 비밀번호를 입력해 주세요"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                </div>

                <div>
                    <label
                        htmlFor="confirm"
                        className="text-18px-medium sm:text-20px-medium block pb-1 text-base md:text-left"
                    >
                        비밀번호 재확인
                    </label>
                    <input
                        id="confirm"
                        type="password"
                        className="text-14px-medium sm:text-18px-medium hover:border-main focus:ring-main w-full rounded-lg border border-[#B2B2B2] px-3 py-3 transition placeholder:text-[#B2B2B2] focus:ring-1 focus:outline-none"
                        placeholder="비밀번호를 다시 입력해 주세요"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                    {confirmPassword && newPassword !== confirmPassword && (
                        <p className="mt-2 text-center text-sm text-red-500 md:text-left md:text-base">
                            비밀번호가 일치하지 않습니다.
                        </p>
                    )}
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

                <div className="mt-8 mb-10 flex sm:mt-12">
                    <button
                        type="submit"
                        disabled={!isFormValid || isPending}
                        className={`text-16px-medium sm:text-18px-medium h-[55px] w-full rounded-lg py-3 text-white transition-colors sm:h-[60px] ${
                            isFormValid && !isPending
                                ? 'hover:bg-main bg-main cursor-pointer'
                                : 'bg-black-30 cursor-not-allowed'
                        }`}
                    >
                        {isPending ? '변경 중...' : '비밀번호 변경'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PasswordChangePage;
