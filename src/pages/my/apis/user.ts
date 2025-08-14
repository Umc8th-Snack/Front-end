import type { UserProfile } from '@/pages/my/types/types';
import axiosInstance from '@/shared/apis/axios';

export const fetchUserProfile = async (): Promise<UserProfile> => {
    const res = await axiosInstance.get('/api/users/me');

    if (!res.data?.isSuccess) {
        throw new Error(res.data?.message ?? '프로필 조회 실패');
    }

    return res.data.result as UserProfile;
};

export type UpdateUserProfilePayload = {
    nickname?: string;
    profileImage?: string;
    introduction?: string;
};

export const updateUserProfile = async (payload: UpdateUserProfilePayload): Promise<UserProfile> => {
    const res = await axiosInstance.patch('/api/users/me', payload);

    if (!res.data?.isSuccess) {
        throw new Error(res.data?.message ?? '프로필 수정 실패');
    }

    return res.data.result as UserProfile;
};
