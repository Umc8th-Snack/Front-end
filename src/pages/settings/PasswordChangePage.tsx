import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

import { authApi } from '@/shared/apis/auth';

const PasswordChangePage = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isFormValid =
        currentPassword.trim() !== '' &&
        newPassword.trim() !== '' &&
        confirmPassword.trim() !== '' &&
        newPassword === confirmPassword;

    const { mutate, isPending } = useMutation({
        mutationFn: authApi.changePassword,
        // onSuccess: (data) => {
        //     // TODO: 토스트/알럿 등으로 메시지 노출
        //     // ex) toast.success(data.message ?? '비밀번호가 변경되었습니다.');
        //     // TODO: 필요하면 페이지 이동
        // },
        // onError: (err: any) => {
        //     // TODO: 에러 처리 (백엔드 에러 메시지 매핑)
        //     // ex) toast.error(err.response?.data?.message ?? '변경에 실패했습니다.');
        // },
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid || isPending) return;
        mutate({ currentPassword, newPassword, confirmPassword });
    };

    return (
        <div className="mt-20 flex min-h-screen flex-col items-center">
            <h2 className="text-36px-semibold">비밀번호 변경</h2>
            <p className="text-24px-medium text-black-70">변경하실 새로운 비밀번호를 설정해 주세요.</p>

            <form onSubmit={onSubmit} className="mt-12 w-[432px] space-y-6">
                {/* 현재 비밀번호 */}
                <div>
                    <label htmlFor="current" className="text-24px-medium">
                        현재 비밀번호
                    </label>
                    <input
                        id="current"
                        type="password"
                        className="hover:border-main focus:ring-main border-black-30 text-24px-medium placeholder-black-30 mt-2 h-[68px] w-full rounded-[8px] border px-3 py-2 outline-none focus:ring-1"
                        placeholder="현재 비밀번호를 입력해 주세요"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>

                {/* 새 비밀번호 */}
                <div>
                    <label htmlFor="password" className="text-24px-medium">
                        새 비밀번호
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="hover:border-main focus:ring-main border-black-30 text-24px-medium placeholder-black-30 mt-2 h-[68px] w-full rounded-[8px] border px-3 py-2 outline-none focus:ring-1"
                        placeholder="새 비밀번호를 입력해 주세요"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                {/* 비밀번호 확인 */}
                <div>
                    <label htmlFor="confirm" className="text-24px-medium">
                        비밀번호 재확인
                    </label>
                    <input
                        id="confirm"
                        type="password"
                        className="hover:border-main focus:ring-main border-black-30 text-24px-medium placeholder-black-30 mt-2 h-[68px] w-full rounded-[8px] border px-3 py-2 outline-none focus:ring-1"
                        placeholder="비밀번호를 다시 입력해 주세요"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPassword && newPassword !== confirmPassword && (
                        <p className="mt-2 text-sm text-red-500">비밀번호가 일치하지 않습니다.</p>
                    )}
                </div>

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

export default PasswordChangePage;
