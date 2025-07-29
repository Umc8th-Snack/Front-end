import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        id: '아이디아이디아이디아이디아이디',
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
        <div className="mx-auto max-w-xl px-4 py-12">
            <h1 className="mb-8 text-center text-xl font-bold">프로필 편집</h1>

            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <label className="mb-1 block text-sm">
                    아이디
                    <input
                        name="id"
                        value={form.id}
                        onChange={handleChange}
                        className="mt-1 w-full rounded border px-3 py-2"
                    />
                </label>

                <label className="mb-1 block text-sm">
                    닉네임
                    <input
                        name="nickname"
                        value={form.nickname}
                        onChange={handleChange}
                        className="mt-1 w-full rounded border px-3 py-2"
                    />
                </label>
            </div>

            <div className="mb-6">
                <label className="mb-1 block text-sm">
                    소개글
                    <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        rows={5}
                        className="mt-1 w-full rounded border px-3 py-2"
                    />
                </label>
            </div>

            <div className="text-center">
                <button onClick={handleSubmit} className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
                    완료
                </button>
            </div>
        </div>
    );
};

export default EditProfilePage;
