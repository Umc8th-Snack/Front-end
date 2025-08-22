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
        <div className="mt-20 flex min-h-screen flex-col items-center px-4 sm:px-6">
            {/* 헤더: 모바일 포함 중앙 정렬, 데스크탑 기존 토큰 유지 */}
            <h2 className="md:text-36px-semibold text-24px-semibold text-center">회원 탈퇴</h2>
            <p className="md:text-24px-medium text-20px-medium text-black-70 text-center text-base">
                탈퇴 시 계정이 삭제됩니다.
            </p>

            <form onSubmit={handleOpenModal} className="mt-8 w-full max-w-[432px] space-y-4 md:mt-22 md:space-y-6">
                <div>
                    <label htmlFor="password" className="md:text-24px-medium block md:text-left">
                        비밀번호
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="border-black-30 placeholder-black-30 hover:border-main focus:ring-main md:text-24px-medium mt-2 h-12 w-full rounded-[8px] border px-3 py-2 text-base outline-none focus:ring-1 md:h-[68px]"
                        placeholder="비밀번호를 입력해주세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={!isFormValid || isPending}
                    className={`md:text-24px-medium h-12 w-full rounded-[8px] py-2 text-base text-white transition-colors md:mt-6 md:h-[68px] ${
                        isFormValid && !isPending
                            ? 'hover:bg-main cursor-pointer bg-blue-500'
                            : 'bg-black-30 cursor-not-allowed'
                    }`}
                >
                    {isPending ? '처리 중...' : '회원 탈퇴'}
                </button>
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
