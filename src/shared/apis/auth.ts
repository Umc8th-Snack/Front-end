import type { LoginRequestTypes, LoginResponseTypes } from '../types/apiTypes';
import api from './api';
import axiosInstance from './axios';

/**
 * 인증 관련 API
 */
export const authApi = {
    /**
     * 로그인
     */
    login: async (loginData: LoginRequestTypes): Promise<LoginResponseTypes> => {
        return api.postStandard<LoginResponseTypes>('/api/auth/login', loginData);
    },

    /**
     * 로그인 (토큰과 함께 반환)
     */
    loginWithToken: async (loginData: LoginRequestTypes): Promise<{ data: LoginResponseTypes; token: string }> => {
        const response = await axiosInstance.post('/api/auth/login', loginData);
        const accessToken = response.headers.authorization?.replace('Bearer ', '') || '';
        return {
            data: response.data.result,
            token: accessToken,
        };
    },

    /**
     * 로그아웃
     */
    logout: async (): Promise<void> => {
        return api.postStandard<void>('/api/auth/logout');
    },

    /**
     * 토큰 재발급
     */
    reissueToken: async (): Promise<LoginResponseTypes> => {
        return api.postStandard<LoginResponseTypes>('/api/auth/reissue');
    },
};
