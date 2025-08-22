import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

import DeleteAccountModal from '@/pages/settings/components/DeleteAccountModal/DeleteAccountModal';
import { authApi } from '@/shared/apis/auth';
import { tokenUtils } from '@/shared/utils/auth';

const DeleteAccountPage = () => {
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isFormValid = password.trim() !== '';
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (pw: string) => authApi.withdraw(pw),
        onSuccess: () => {
            // 토큰/캐시 정리
            tokenUtils.removeAccessToken();
            localStorage.removeItem('user');
            queryClient.clear();

            setIsModalOpen(false);
            alert('회원 탈퇴가 완료되었습니다.');

            // AuthContext 동기화
            setTimeout(() => {
                window.location.href = '/';
            }, 100);
        },
        onError: (error: unknown) => {
            setIsModalOpen(false);
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
            }
        },
    });

    const handleOpenModal: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (isFormValid) setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        if (!isPending) setIsModalOpen(false);
    };

    const handleConfirmDelete = () => {
        mutate(password);
    };

    const handleCancelDelete = () => {
        if (!isPending) setIsModalOpen(false);
    };

    return (
        <div className="mt-3 flex min-h-screen flex-col items-center px-10 sm:mt-10 sm:px-12">
            {/* 헤더: 모바일 포함 중앙 정렬, 데스크탑 기존 토큰 유지 */}
            <h2 className="sm:text-32px-semibold text-24px-semibold text-center">회원 탈퇴</h2>
            <p className="sm:text-20px-medium text-16px-medium text-black-70 text-center">탈퇴 시 계정이 삭제됩니다.</p>

            <form
                onSubmit={handleOpenModal}
                className="mx-auto mt-8 w-full max-w-[432px] space-y-4 sm:mt-8 sm:space-y-6"
            >
                <div>
                    <label htmlFor="password" className="text-18px-medium sm:text-20px-medium block pb-1 md:text-left">
                        비밀번호
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="text-14px-medium sm:text-18px-medium hover:border-main focus:ring-main w-full rounded-lg border border-[#B2B2B2] px-3 py-3 transition placeholder:text-[#B2B2B2] focus:ring-1 focus:outline-none"
                        placeholder="비밀번호를 입력해주세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>

                <div className="mt-8 mb-10 flex sm:mt-12">
                    <button
                        type="submit"
                        disabled={!isFormValid || isPending}
                        className={`text-16px-medium sm:text-18px-medium h-[55px] w-full rounded-lg py-3 text-white transition-colors sm:h-[60px] ${
                            isFormValid && !isPending
                                ? 'bg-main hover:bg-main-dark cursor-pointer'
                                : 'bg-black-30 cursor-not-allowed'
                        }`}
                    >
                        {isPending ? '처리 중...' : '회원 탈퇴'}
                    </button>
                </div>
            </form>

            {isModalOpen && (
                <DeleteAccountModal
                    onClose={handleCloseModal}
                    onConfirmDelete={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    isLoading={isPending}
                />
            )}
        </div>
    );
};

export default DeleteAccountPage;
