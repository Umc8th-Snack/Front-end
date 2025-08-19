import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchUserProfile, updateUserProfile } from '@/pages/my/apis/user';
import { MY_QUERY_KEYS } from '@/pages/my/constants/queryConstants';

const EditProfilePage = () => {
    const navigate = useNavigate();
    const qc = useQueryClient();

    const { data: me } = useQuery({
        queryKey: MY_QUERY_KEYS.USER_PROFILE,
        queryFn: fetchUserProfile,
    });

    // 닉네임, 소개글 관리
    const [form, setForm] = useState({
        nickname: '',
        introduction: '',
    });

    useEffect(() => {
        if (me) {
            setForm({
                nickname: me.nickname ?? '',
                introduction: me.introduction ?? '',
            });
        }
    }, [me]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // ====== Validation ======
    const nicknameTrim = form.nickname.trim();
    const nicknameLen = nicknameTrim.length;
    const isNicknameValid = nicknameLen >= 2 && nicknameLen <= 6;

    const introLen = form.introduction.length; // textarea에 maxLength=100으로 입력 자체 제한
    const isIntroValid = introLen <= 100;

    const { mutate, isPending } = useMutation({
        mutationFn: () =>
            updateUserProfile({
                nickname: nicknameTrim,
                introduction: form.introduction,
            }),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: MY_QUERY_KEYS.USER_PROFILE });
            void navigate('/mypage');
        },
        onError: () => {
            alert('프로필 수정에 실패했습니다. 잠시 후 다시 시도해주세요.');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isNicknameValid || !isIntroValid) return;
        mutate();
    };

    const canSubmit = isNicknameValid && isIntroValid && !isPending;

    return (
        <div className="mx-auto w-full max-w-screen-md px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12">
            {/* 제목: 모바일 작게, 화면 커질수록 확대 */}
            <h1 className="mt-4 text-center text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                프로필 편집
            </h1>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6 sm:mt-8 sm:space-y-8 md:mt-10">
                {/* 닉네임 */}
                <div className="mx-auto w-full max-w-lg">
                    <label htmlFor="nickname" className="block text-sm font-medium text-neutral-800 sm:text-base">
                        닉네임
                    </label>
                    <input
                        id="nickname"
                        name="nickname"
                        value={form.nickname}
                        onChange={handleChange}
                        className="mt-2 block h-12 w-full rounded-lg border border-neutral-300 px-3 py-2 text-base text-neutral-800 placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 focus-visible:outline-none sm:h-12 sm:text-lg md:h-14"
                        aria-invalid={!isNicknameValid}
                        aria-describedby="nickname-help"
                        required
                        autoComplete="nickname"
                        inputMode="text"
                    />
                    {!isNicknameValid && (
                        <p id="nickname-help" className="mt-2 text-xs text-red-500 sm:text-sm">
                            닉네임은 2-6자 사이여야 합니다.
                        </p>
                    )}
                </div>

                {/* 소개글 */}
                <div className="mx-auto w-full max-w-3xl">
                    <label htmlFor="introduction" className="block text-sm font-medium text-neutral-800 sm:text-base">
                        소개글
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="introduction"
                            name="introduction"
                            value={form.introduction}
                            onChange={handleChange}
                            rows={5}
                            maxLength={100}
                            className="block h-32 w-full rounded-lg border border-neutral-300 px-3 py-2 text-base text-neutral-800 placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none sm:h-40 sm:text-lg md:h-48"
                            aria-describedby="intro-counter"
                            autoComplete="off"
                        />
                        <div id="intro-counter" className="mt-1 text-right text-[11px] text-neutral-400 sm:text-xs">
                            {introLen}/100
                        </div>
                    </div>
                </div>

                {/* 완료 버튼 */}
                <div className="mx-auto w-full max-w-lg">
                    <button
                        type="submit"
                        disabled={!canSubmit}
                        className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-blue-600 text-base font-medium text-white transition-[background-color,transform] duration-150 hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 sm:w-56 sm:text-lg md:h-17"
                    >
                        {isPending ? '저장 중...' : '완료'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfilePage;
