import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteAccount } from '@/pages/settings/apis/auth';
import DeleteAccountModal from '@/pages/settings/components/DeleteAccountModal/DeleteAccountModal';

const DeleteAccountPage = () => {
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isFormValid = password.trim() !== '';

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    //  비밀번호 틀리면 서버에서 온 메시지를 alert로 보여줌
    const { mutate, isPending } = useMutation({
        mutationFn: (pw: string) => deleteAccount(pw),
        onSuccess: () => {
            // 토큰/캐시 정리
            localStorage.removeItem('accessToken');

            queryClient.clear();

            setIsModalOpen(false);
            alert('회원 탈퇴가 완료되었습니다.');
            void navigate('/', { replace: true });
        },
        onError: (error: unknown) => {
            setIsModalOpen(false);

            // DeleteAccount에서 throw한 Error(message)를 그대로 출력
            if (error instanceof Error) {
                alert(error.message); // 예: "비밀번호가 올바르지 않습니다"
            } else {
                alert('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
            }
        },
    });

    const handleOpenModal = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        if (!isPending) setIsModalOpen(false);
    };

    const handleConfirmDelete = () => {
        // 모달의 "회원 탈퇴" 버튼 클릭 시 실제 API 호출
        mutate(password);
    };

    const handleCancelDelete = () => {
        if (!isPending) setIsModalOpen(false);
    };

    return (
        <div className="mt-20 flex min-h-screen flex-col items-center">
            <h2 className="text-36px-semibold">회원 탈퇴</h2>
            <p className="text-24px-medium text-black-70">탈퇴 시 계정이 삭제됩니다.</p>

            <form onSubmit={handleOpenModal} className="mt-22 w-[432px] space-y-6">
                <div>
                    <label htmlFor="password" className="text-24px-medium">
                        비밀번호
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="hover:border-main focus:ring-main border-black-30 text-24px-medium placeholder-black-30 mt-2 h-[68px] w-full rounded-[8px] border px-3 py-2 outline-none focus:ring-1"
                        placeholder="비밀번호를 입력해주세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!isFormValid || isPending}
                    className={`text-24px-medium mt-6 h-[68px] w-full rounded-[8px] py-2 text-white transition-colors ${
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
