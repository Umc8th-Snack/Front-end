import axiosInstance from '@/pages/my/apis/axios';
import type { UserProfile } from '@/pages/my/types/types';

export const fetchUserProfile = async (): Promise<UserProfile> => {
    const res = await axiosInstance.get('/api/users/me');
    return res.data.result;
};

export type UpdateUserProfilePayload = {
    nickname?: string;
    introduction?: string;
};

export const updateUserProfile = async (payload: UpdateUserProfilePayload): Promise<UserProfile> => {
    const res = await axiosInstance.patch('/api/users/me', payload);
    return res.data.result;
};
