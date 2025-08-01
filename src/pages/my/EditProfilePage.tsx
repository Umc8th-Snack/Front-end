import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        id: '아이디아이디아이디아이디',
        nickname: '닉네임',
        bio: '소개글',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        // TODO: 저장 API 요청
        void navigate('/mypage');
    };

    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            <h1 className="text-36px-semibold mt-10 text-center">프로필 편집</h1>

            {/* 아이디 + 닉네임 */}
            <div className="mt-15 mb-4 grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-2">
                <label className="text-24px-medium text-black-70 block">
                    아이디
                    <input
                        name="id"
                        value={form.id}
                        onChange={handleChange}
                        className="border-black-30 text-24px-medium text-black-70 mt-1 h-[68px] w-[354px] rounded-[8px] border px-4 py-2 text-base"
                    />
                </label>

                <label className="text-24px-medium text-black-70 block">
                    닉네임
                    <input
                        name="nickname"
                        value={form.nickname}
                        onChange={handleChange}
                        className="border-black-30 text-24px-medium text-black-70 mt-1 h-[68px] w-[354px] rounded-[8px] border px-4 py-2 text-base"
                    />
                </label>
            </div>

            {/* 소개글 */}
            <div className="mt-10 flex justify-center">
                <label className="text-24px-medium text-black-70 block w-full max-w-[749px]">
                    소개글
                    <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        rows={5}
                        className="border-black-30 text-24px-medium text-black-70 mt-1 h-[164px] w-full rounded-[8px] border px-4 py-2 text-base"
                    />
                </label>
            </div>

            {/* 완료 버튼 */}
            <div className="mt-15 text-center">
                <button
                    onClick={handleSubmit}
                    className="bg-main text-24px-medium h-[68px] w-[200px] cursor-pointer rounded-[8px] px-8 py-3 text-white hover:bg-blue-700"
                >
                    완료
                </button>
            </div>
        </div>
    );
};

export default EditProfilePage;
