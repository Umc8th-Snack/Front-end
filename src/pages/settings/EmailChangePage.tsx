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
                // 훅에서 캐시 갱신/무효화 수행됨
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
        <div className="mt-20 flex min-h-screen flex-col items-center">
            <h2 className="text-36px-semibold">이메일 변경</h2>
            <p className="text-24px-medium text-black-70">변경하실 새로운 이메일을 설정해 주세요.</p>

            <form className="mt-10 w-[432px] space-y-6" onSubmit={handleSubmit}>
                {/* 새 이메일 */}
                <div>
                    <label htmlFor="newEmail" className="text-24px-medium">
                        새 이메일
                    </label>
                    <input
                        id="newEmail"
                        type="email"
                        className="hover:border-main focus:ring-main border-black-30 text-24px-medium placeholder-black-30 mt-2 h-[68px] w-full rounded-[8px] border px-3 py-2 outline-none focus:ring-1"
                        placeholder="새 이메일을 입력해 주세요"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        autoComplete="email"
                    />
                </div>

                {/* 현재 비밀번호 */}
                <div>
                    <label htmlFor="currentPassword" className="text-24px-medium">
                        현재 비밀번호
                    </label>
                    <input
                        id="currentPassword"
                        type="password"
                        className="hover:border-main focus:ring-main border-black-30 text-24px-medium placeholder-black-30 mt-2 h-[68px] w-full rounded-[8px] border px-3 py-2 outline-none focus:ring-1"
                        placeholder="현재 비밀번호를 입력해 주세요"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        autoComplete="current-password"
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
                    {isPending ? '변경 중...' : '이메일 변경'}
                </button>
            </form>
        </div>
    );
};

export default EmailChangePage;
