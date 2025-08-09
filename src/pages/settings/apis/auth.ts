import axiosInstance from '@/pages/my/apis/axios';

export const logout = async (): Promise<void> => {
    await axiosInstance.post('/api/auth/logout');
};
