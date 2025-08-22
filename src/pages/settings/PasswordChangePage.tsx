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
        <div className="mt-20 flex min-h-screen flex-col items-center px-4 sm:px-6">
            <h2 className="md:text-36px-semibold text-24px-semibold">비밀번호 변경</h2>
            <p className="md:text-24px-medium text-black-70 text-20px-medium text-base">
                변경하실 새로운 비밀번호를 설정해 주세요.
            </p>

            <form onSubmit={onSubmit} className="mt-12 w-full max-w-[432px] space-y-4 md:space-y-6">
                <div>
                    <label htmlFor="current" className="md:text-24px-medium block text-base md:text-left">
                        현재 비밀번호
                    </label>
                    <input
                        id="current"
                        type="password"
                        className="border-black-30 placeholder-black-30 hover:border-main focus:ring-main md:text-24px-medium mt-2 h-12 w-full rounded-[8px] border px-3 py-2 text-base outline-none focus:ring-1 md:h-[68px]"
                        placeholder="현재 비밀번호를 입력해 주세요"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="md:text-24px-medium block text-base md:text-left">
                        새 비밀번호
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="border-black-30 placeholder-black-30 hover:border-main focus:ring-main md:text-24px-medium mt-2 h-12 w-full rounded-[8px] border px-3 py-2 text-base outline-none focus:ring-1 md:h-[68px]"
                        placeholder="새 비밀번호를 입력해 주세요"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                </div>

                <div>
                    <label htmlFor="confirm" className="md:text-24px-medium block text-base md:text-left">
                        비밀번호 재확인
                    </label>
                    <input
                        id="confirm"
                        type="password"
                        className="border-black-30 placeholder-black-30 hover:border-main focus:ring-main md:text-24px-medium mt-2 h-12 w-full rounded-[8px] border px-3 py-2 text-base outline-none focus:ring-1 md:h-[68px]"
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

                <button
                    type="submit"
                    disabled={!isFormValid || isPending}
                    className={`md:text-24px-medium h-12 w-full rounded-[8px] py-2 text-base text-white transition-colors md:mt-6 md:h-[68px] ${
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

export default PasswordChangePage;
