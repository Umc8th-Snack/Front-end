import type { LoginRequestTypes, LoginResponseTypes, SignupRequestTypes, SignupResponseTypes } from '../types/apiTypes';
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
        console.log('🚀 [AUTH API] 로그인 요청 시작:', { email: loginData.email, hasPassword: !!loginData.password });

        const response = await axiosInstance.post('/api/auth/login', loginData);
        const accessToken = response.headers.authorization?.replace('Bearer ', '') || '';

        console.log('✅ [AUTH API] 로그인 응답 수신:', {
            status: response.status,
            hasToken: !!accessToken,
            userData: response.data.result,
            headers: response.headers,
        });

        return {
            data: response.data.result,
            token: accessToken,
        };
    },

    /**
     * 로그아웃
     */
    logout: async (): Promise<void> => {
        console.log('🚪 [AUTH API] 로그아웃 요청 시작');
        const result = await api.postStandard<void>('/api/auth/logout');
        console.log('✅ [AUTH API] 로그아웃 완료');
        return result;
    },

    /**
     * 토큰 재발급
     */
    reissueToken: async (): Promise<LoginResponseTypes> => {
        return api.postStandard<LoginResponseTypes>('/api/auth/reissue');
    },

    /**
     * 토큰 재발급 (토큰과 함께 반환)
     */
    reissueTokenWithToken: async (): Promise<{ data: LoginResponseTypes; token: string }> => {
        console.log('🔄 [AUTH API] 토큰 재발급 요청 시작');

        const response = await axiosInstance.post('/api/auth/reissue');
        const accessToken = response.headers.authorization?.replace('Bearer ', '') || '';

        console.log('✅ [AUTH API] 토큰 재발급 응답 수신:', {
            status: response.status,
            hasToken: !!accessToken,
            userData: response.data.result,
        });

        return {
            data: response.data.result,
            token: accessToken,
        };
    },

    /**
     * 회원가입
     */
    signup: async (signupData: SignupRequestTypes): Promise<SignupResponseTypes> => {
        console.log('🚀 [AUTH API] 회원가입 요청 시작:', { email: signupData.email, nickname: signupData.nickname });

        const response = await api.postStandard<SignupResponseTypes>('/api/users/signup', signupData);

        console.log('✅ [AUTH API] 회원가입 응답 수신:', response);

        return response;
    },
};
