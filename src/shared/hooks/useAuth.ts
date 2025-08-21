import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authApi } from '../apis/auth';
import type {
    LoginRequestTypes,
    LoginResponseTypes,
    SignupRequestTypes,
    SignupResponseTypes,
    SocialLoginResponseTypes,
} from '../types/apiTypes';

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
    const queryClient = useQueryClient();

    return useMutation<void, Error, void>({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            console.log('✅ [USE LOGOUT] 로그아웃 뮤테이션 성공');
            // React Query 캐시 전체 초기화
            queryClient.clear();
            console.log('🧼 [USE LOGOUT] React Query 캐시 초기화 완료');
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
    const queryClient = useQueryClient();

    return useMutation<LoginResponseTypes, Error, void>({
        mutationFn: () => authApi.reissueToken(),
        onSuccess: (data) => {
            console.log('✅ [USE REISSUE] 토큰 재발급 성공:', data);
            // 사용자 관련 쿼리 무효화 (예: ['user'], ['userInfo'] 등)
            void queryClient.invalidateQueries({ queryKey: ['user'] });
            console.log('🔄 [USE REISSUE] 사용자 쿼리 무효화 완료');
        },
        onError: (error) => {
            console.error('❌ [USE REISSUE] 토큰 재발급 실패:', error);
        },
    });
};

/**
 * 회원가입 mutation 훅 (자동 로그인 포함)
 */
export const useSignup = () => {
    return useMutation<
        { signupData: SignupResponseTypes; loginData?: { data: LoginResponseTypes; token: string } },
        Error,
        SignupRequestTypes
    >({
        mutationFn: async (signupData: SignupRequestTypes) => {
            // 1단계: 회원가입
            const signupResponse = await authApi.signup(signupData);
            console.log('✅ [USE SIGNUP] 회원가입 성공:', signupResponse);

            try {
                // 2단계: 자동 로그인 시도
                const loginResponse = await authApi.loginWithToken({
                    email: signupData.email,
                    password: signupData.password,
                });
                console.log('✅ [USE SIGNUP] 자동 로그인 성공:', loginResponse);

                return {
                    signupData: signupResponse,
                    loginData: loginResponse,
                };
            } catch (loginError) {
                // 로그인 실패해도 회원가입은 성공으로 처리
                console.warn('⚠️ [USE SIGNUP] 자동 로그인 실패, 회원가입만 완료:', loginError);
                return {
                    signupData: signupResponse,
                };
            }
        },
        onSuccess: (data) => {
            console.log('✅ [USE SIGNUP] 회원가입 뮤테이션 성공:', data);

            // 자동 로그인 성공 시 토큰 저장
            if (data.loginData?.token) {
                // 토큰 저장 로직 (tokenUtils.setAccessToken 등)
                localStorage.setItem('accessToken', data.loginData.token);

                // 사용자 정보 저장
                if (data.loginData.data) {
                    localStorage.setItem('user', JSON.stringify(data.loginData.data));
                }

                console.log('✅ [USE SIGNUP] 토큰 및 사용자 정보 저장 완료');
            }
        },
        onError: (error) => {
            console.error('❌ [USE SIGNUP] 회원가입 뮤테이션 실패:', error);
        },
    });
};

/**
 * Google 소셜 로그인 mutation 훅
 */
export const useGoogleLogin = () => {
    const queryClient = useQueryClient();

    return useMutation<{ data: SocialLoginResponseTypes; token: string }, Error, string>({
        mutationFn: async (code: string) => {
            const response = await authApi.googleCallback(code);
            return response;
        },
        onSuccess: (data) => {
            console.log('✅ [USE GOOGLE LOGIN] Google 로그인 성공:', data.data);
            // 사용자 관련 쿼리 무효화
            void queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (error) => {
            console.error('❌ [USE GOOGLE LOGIN] Google 로그인 실패:', error);
        },
    });
};
