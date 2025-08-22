import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MY_QUERY_KEYS } from '@/pages/my/constants/queryConstants';
import { userApi } from '@/shared/apis/user';

const EditProfilePage = () => {
    const navigate = useNavigate();
    const qc = useQueryClient();

    const { data: me } = useQuery({
        queryKey: MY_QUERY_KEYS.USER_PROFILE,
        queryFn: userApi.getMyInfo,
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
            userApi.updateMyInfo({
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
        <div className="mt-3 flex min-h-screen flex-col items-center px-10 sm:mt-10 sm:px-12">
            {/* 제목: 모바일 작게, 화면 커질수록 확대 */}
            <h1 className="text-24px-semibold sm:text-32px-semibold mt-4 text-center tracking-tight">프로필 편집</h1>

            <form onSubmit={handleSubmit} className="mx-auto mt-8 w-full max-w-[432px] space-y-4 sm:space-y-6">
                {/* 닉네임 */}
                <div className="mx-auto w-full max-w-[432px]">
                    <label htmlFor="nickname" className="text-18px-medium sm:text-20px-medium block pb-1 text-base">
                        닉네임
                    </label>
                    <input
                        id="nickname"
                        name="nickname"
                        value={form.nickname}
                        onChange={handleChange}
                        className="text-14px-medium sm:text-18px-medium hover:border-main focus:ring-main w-full rounded-lg border border-[#B2B2B2] px-3 py-3 transition placeholder:text-[#B2B2B2] focus:ring-1 focus:outline-none"
                        aria-invalid={!isNicknameValid}
                        aria-describedby="nickname-help"
                        required
                        autoComplete="nickname"
                        inputMode="text"
                    />
                    {!isNicknameValid && (
                        <p id="nickname-help" className="text-12px-medium sm:text-14px-medium mt-2 text-red-500">
                            닉네임은 2-6자 사이여야 합니다.
                        </p>
                    )}
                </div>

                {/* 소개글 */}
                <div className="mx-auto w-full max-w-[432px]">
                    <label htmlFor="introduction" className="text-18px-medium sm:text-20px-medium block pb-1 text-base">
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
                            className="text-14px-medium sm:text-18px-medium hover:border-main focus:ring-main h-[120px] w-full rounded-lg border border-[#B2B2B2] px-3 py-3 transition placeholder:text-[#B2B2B2] focus:ring-1 focus:outline-none"
                            aria-describedby="intro-counter"
                            autoComplete="off"
                        />
                        <div
                            id="intro-counter"
                            className="text-12px-medium sm:text-14px-medium mt-1 text-right text-neutral-400"
                        >
                            {introLen}/100
                        </div>
                    </div>
                </div>

                {/* 완료 버튼 */}
                <div className="mx-auto mt-8 flex w-full max-w-[432px] sm:mt-12">
                    <button
                        type="submit"
                        disabled={!canSubmit}
                        className={`text-16px-medium sm:text-18px-medium h-[55px] w-full rounded-lg py-3 text-white transition-colors hover:opacity-70 sm:h-[60px] ${
                            canSubmit ? 'bg-main cursor-pointer' : 'bg-black-30 cursor-not-allowed'
                        }`}
                    >
                        {isPending ? '저장 중...' : '완료'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfilePage;
