import axiosInstance from '@/pages/my/apis/axios';

export const logout = async (): Promise<void> => {
    await axiosInstance.post('/api/auth/logout');
};

export const deleteAccount = async (password: string): Promise<void> => {
    const res = await axiosInstance.post('/api/users/me/withdraw', { password });
    if (res.data && res.data.isSuccess === false) {
        throw new Error(res.data.message);
    }
};
export interface ChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const changeMyPassword = async (payload: ChangePasswordPayload) => {
    const res = await axiosInstance.patch('/api/users/me/password', payload);
    return res.data;
};
