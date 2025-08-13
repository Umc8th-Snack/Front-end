import axiosInstance from '@/pages/my/apis/axios';

import type {
    ApiEnvelope,
    ChangeEmailPayload,
    ChangeEmailResult,
    ChangePasswordPayload,
    WithdrawPayload,
} from '../types/types';

// 로그아웃
export const logout = async (): Promise<void> => {
    await axiosInstance.post('/api/auth/logout');
};

// 회원 탈퇴
export const deleteAccount = async (password: string): Promise<void> => {
    const res = await axiosInstance.post<ApiEnvelope<unknown>>('/api/users/me/withdraw', {
        password,
    } satisfies WithdrawPayload);

    if (!res.data?.isSuccess) {
        throw new Error(res.data?.message || '회원 탈퇴에 실패했습니다.');
    }
};

// 비밀번호 변경
export const changeMyPassword = async (payload: ChangePasswordPayload) => {
    const res = await axiosInstance.patch<ApiEnvelope<unknown>>('/api/users/me/password', payload);
    if (!res.data?.isSuccess) {
        throw new Error(res.data?.message || '비밀번호 변경에 실패했습니다.');
    }
    return res.data;
};

// 이메일 변경 (이번 작업의 핵심)
export const changeMyEmail = async (payload: ChangeEmailPayload) => {
    const res = await axiosInstance.patch<ApiEnvelope<ChangeEmailResult>>('/api/users/me/email', payload);

    if (!res.data?.isSuccess) {
        throw new Error(res.data?.message || '이메일 변경에 실패했습니다.');
    }
    return res.data.result; // { email, updatedAt }
};
