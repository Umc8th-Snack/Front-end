// pages/settings/DeleteAccountPage.tsx
import React, { useState } from 'react';

import DeleteAccountModal from '@/shared/components/modal/DeleteAccountModal/DeleteAccountModal';

const DeleteAccountPage = () => {
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isFormValid = password.trim() !== '';

    const handleOpenModal = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleConfirmDelete = () => {
        alert('회원 탈퇴 완료');
        setIsModalOpen(false);
        // TODO: 실제 탈퇴 처리 로직 추가
    };

    const handleCancelDelete = () => {
        alert('탈퇴 취소');
        setIsModalOpen(false);
    };

    return (
        <div className="mt-20 flex min-h-screen flex-col items-center">
            <h2 className="text-36px-semibold">회원 탈퇴</h2>

            <form onSubmit={handleOpenModal} className="mt-22 w-[432px] space-y-6">
                <div>
                    <label htmlFor="password" className="text-24px-medium">
                        비밀번호
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="text-24px-medium border-black-30 placeholder-black-30 h-[68px] w-full rounded-[8px] border px-3 py-2 outline-none"
                        placeholder="비밀번호를 입력해주세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`text-24px-medium mt-6 h-[68px] w-full rounded-[8px] py-2 text-white transition-colors ${
                        isFormValid ? 'hover:bg-main cursor-pointer bg-blue-500' : 'bg-black-30 cursor-not-allowed'
                    }`}
                >
                    회원 탈퇴
                </button>
            </form>

            {isModalOpen && (
                <DeleteAccountModal
                    onClose={handleCloseModal}
                    onConfirmDelete={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
};

export default DeleteAccountPage;
