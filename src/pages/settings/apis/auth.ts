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
