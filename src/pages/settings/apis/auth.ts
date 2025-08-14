import axiosInstance from '@/shared/apis/axios';

import type { ChangeEmailPayload, ChangeEmailResult, ChangePasswordPayload, WithdrawPayload } from '../types/types';

// 로그아웃: 서버가 envelope를 주는 구조라면 검사, 아니면 그냥 무시해도 됨
export const logout = async (): Promise<void> => {
    const res = await axiosInstance.post('/api/auth/logout');
    if (res.data && res.data.isSuccess === false) {
        throw new Error(res.data?.message ?? '로그아웃 실패');
    }
};

// 회원 탈퇴
export const deleteAccount = async (password: string): Promise<void> => {
    const res = await axiosInstance.post('/api/users/me/withdraw', { password } as WithdrawPayload);
    if (!res.data?.isSuccess) {
        throw new Error(res.data?.message ?? '회원 탈퇴에 실패했습니다.');
    }
};

// 비밀번호 변경
export const changeMyPassword = async (payload: ChangePasswordPayload): Promise<void> => {
    const res = await axiosInstance.patch('/api/users/me/password', payload);
    if (!res.data?.isSuccess) {
        throw new Error(res.data?.message ?? '비밀번호 변경에 실패했습니다.');
    }
};

// 이메일 변경
export const changeMyEmail = async (payload: ChangeEmailPayload): Promise<ChangeEmailResult> => {
    const res = await axiosInstance.patch('/api/users/me/email', payload);
    if (!res.data?.isSuccess) {
        throw new Error(res.data?.message ?? '이메일 변경에 실패했습니다.');
    }
    return res.data.result as ChangeEmailResult; // { email, updatedAt }
};
