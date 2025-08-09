import { useMutation } from '@tanstack/react-query';

import { authApi } from '../apis/auth';
import type { LoginRequestTypes, LoginResponseTypes, SignupRequestTypes, SignupResponseTypes } from '../types/apiTypes';

/**
 * 로그인 mutation 훅
 */
export const useLogin = () => {
    return useMutation<{ data: LoginResponseTypes; token: string }, Error, LoginRequestTypes>({
        mutationFn: async (loginData: LoginRequestTypes) => {
            const response = await authApi.loginWithToken(loginData);
            return response;
        },
        onSuccess: (data) => {
            console.log('✅ [USE LOGIN] 로그인 뮤테이션 성공:', data);
        },
        onError: (error) => {
            console.error('❌ [USE LOGIN] 로그인 뮤테이션 실패:', error);
        },
    });
};

/**
 * 로그아웃 mutation 훅
 */
export const useLogout = () => {
    return useMutation<void, Error, void>({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            console.log('✅ [USE LOGOUT] 로그아웃 뮤테이션 성공');
        },
        onError: (error) => {
            console.error('❌ [USE LOGOUT] 로그아웃 뮤테이션 실패:', error);
        },
    });
};

/**
 * 토큰 재발급 mutation 훅
 */
export const useReissueToken = () => {
    return useMutation<LoginResponseTypes, Error, void>({
        mutationFn: () => authApi.reissueToken(),
        onSuccess: (data) => {
            console.log('토큰 재발급 성공:', data);
        },
        onError: (error) => {
            console.error('토큰 재발급 실패:', error);
        },
    });
};

/**
 * 회원가입 mutation 훅
 */
export const useSignup = () => {
    return useMutation<SignupResponseTypes, Error, SignupRequestTypes>({
        mutationFn: async (signupData: SignupRequestTypes) => {
            const response = await authApi.signup(signupData);
            return response;
        },
        onSuccess: (data) => {
            console.log('✅ [USE SIGNUP] 회원가입 뮤테이션 성공:', data);
        },
        onError: (error) => {
            console.error('❌ [USE SIGNUP] 회원가입 뮤테이션 실패:', error);
        },
    });
};
