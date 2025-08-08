import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchUserProfile, updateUserProfile } from '@/pages/my/apis/user';
import { QUERY_KEYS } from '@/pages/my/constants/queryConstants';

const EditProfilePage = () => {
    const navigate = useNavigate();
    const qc = useQueryClient();

    const { data: me } = useQuery({
        queryKey: QUERY_KEYS.USER_PROFILE,
        queryFn: fetchUserProfile,
    });

    const [form, setForm] = useState({
        email: '',
        nickname: '',
        introduction: '',
    });

    useEffect(() => {
        if (me) {
            setForm({
                email: me.email ?? '',
                nickname: me.nickname ?? '',
                introduction: me.introduction ?? '',
            });
        }
    }, [me]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const { mutate, isPending } = useMutation({
        mutationFn: () =>
            updateUserProfile({
                nickname: form.nickname,
                introduction: form.introduction,
            }),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: QUERY_KEYS.USER_PROFILE });
            void navigate('/mypage');
        },
        onError: () => {
            alert('프로필 수정에 실패했습니다. 잠시 후 다시 시도해주세요.');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate();
    };

    const disabled = isPending || !form.nickname.trim();

    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            <h1 className="text-36px-semibold mt-10 text-center">프로필 편집</h1>

            <form onSubmit={handleSubmit}>
                {/* 이메일(읽기 전용) + 닉네임 */}
                <div className="mt-15 mb-4 grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-2">
                    <label className="text-24px-medium text-black-70 block">
                        이메일(읽기 전용)
                        <input
                            name="email"
                            value={form.email}
                            readOnly
                            className="border-black-30 text-24px-medium text-black-70 mt-1 h-[68px] w-[354px] rounded-[8px] border bg-gray-50 px-4 py-2 text-base"
                        />
                    </label>

                    <label className="text-24px-medium text-black-70 block">
                        닉네임
                        <input
                            name="nickname"
                            value={form.nickname}
                            onChange={handleChange}
                            className="border-black-30 text-24px-medium text-black-70 mt-1 h-[68px] w-[354px] rounded-[8px] border px-4 py-2 text-base"
                            maxLength={20}
                            required
                        />
                    </label>
                </div>

                {/* 소개글 */}
                <div className="mt-10 flex justify-center">
                    <label className="text-24px-medium text-black-70 block w-full max-w-[749px]">
                        소개글
                        <textarea
                            name="introduction"
                            value={form.introduction}
                            onChange={handleChange}
                            rows={5}
                            className="border-black-30 text-24px-medium text-black-70 mt-1 h-[164px] w-full rounded-[8px] border px-4 py-2 text-base"
                            maxLength={200}
                        />
                    </label>
                </div>

                {/* 완료 버튼 */}
                <div className="mt-15 text-center">
                    <button
                        type="submit"
                        disabled={disabled}
                        className="bg-main text-24px-medium h-[68px] w-[200px] cursor-pointer rounded-[8px] px-8 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isPending ? '저장 중...' : '완료'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfilePage;
