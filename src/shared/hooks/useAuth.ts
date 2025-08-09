import { useMutation } from '@tanstack/react-query';

import { authApi } from '../apis/auth';
import type { LoginRequestTypes, LoginResponseTypes } from '../types/apiTypes';

/**
 * 로그인 mutation 훅
 */
export const useLogin = () => {
    return useMutation<LoginResponseTypes, Error, LoginRequestTypes>({
        mutationFn: (loginData: LoginRequestTypes) => authApi.login(loginData),
        onSuccess: (data) => {
            console.log('로그인 성공:', data);
        },
        onError: (error) => {
            console.error('로그인 실패:', error);
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
            console.log('로그아웃 성공');
        },
        onError: (error) => {
            console.error('로그아웃 실패:', error);
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
