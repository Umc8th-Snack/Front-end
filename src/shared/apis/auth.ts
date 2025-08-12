import type {
    LoginRequestTypes,
    LoginResponseTypes,
    SignupRequestTypes,
    SignupResponseTypes,
    SocialLoginResponseTypes,
} from '../types/apiTypes';
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
     * - Access Token: Authorization 헤더로 전달
     * - Refresh Token: HttpOnly 쿠키로 자동 저장
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
        // Refresh Token은 HttpOnly 쿠키로 브라우저가 자동 관리

        return {
            data: response.data.result,
            token: accessToken, // Access Token만 반환
        };
    },

    /**
     * 로그아웃
     * - 서버에서 Refresh Token 쿠키 무효화
     * - Access Token은 프론트에서 삭제
     */
    logout: async (): Promise<void> => {
        console.log('🚪 [AUTH API] 로그아웃 요청 시작');
        const result = await api.postStandard<void>('/api/auth/logout');
        console.log('✅ [AUTH API] 로그아웃 완료 - Refresh Token 쿠키 무효화됨');
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
     * - Refresh Token: HttpOnly 쿠키로 자동 전송
     * - 새 Access Token: Authorization 헤더로 수신
     * - 새 Refresh Token: HttpOnly 쿠키로 자동 갱신
     */
    reissueTokenWithToken: async (): Promise<{ data: LoginResponseTypes; token: string }> => {
        console.log('🔄 [AUTH API] 토큰 재발급 요청 시작');
        // Refresh Token은 쿠키로 자동 전송됨 (withCredentials: true)

        const response = await axiosInstance.post('/api/auth/reissue');
        const accessToken = response.headers.authorization?.replace('Bearer ', '') || '';

        console.log('✅ [AUTH API] 토큰 재발급 응답 수신:', {
            status: response.status,
            hasToken: !!accessToken,
            userData: response.data.result,
        });
        // 새 Refresh Token은 HttpOnly 쿠키로 브라우저가 자동 갱신

        return {
            data: response.data.result,
            token: accessToken, // 새 Access Token만 반환
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

    /**
     * Google 소셜 로그인 콜백
     * - Google OAuth 인가 코드를 백엔드로 전송
     * - Access Token: Authorization 헤더로 전달
     * - Refresh Token: HttpOnly 쿠키로 자동 저장
     */
    googleCallback: async (code: string): Promise<{ data: SocialLoginResponseTypes; token: string }> => {
        console.log('🔵 [AUTH API] Google 소셜 로그인 요청 시작');

        const response = await axiosInstance.get(`/api/auth/google/callback?code=${code}`);
        const accessToken = response.headers.authorization?.replace('Bearer ', '') || '';

        console.log('✅ [AUTH API] Google 로그인 응답 수신:', {
            status: response.status,
            hasToken: !!accessToken,
            userData: response.data.result,
            isNewUser: response.data.result?.isNewUser,
        });

        return {
            data: response.data.result,
            token: accessToken,
        };
    },
};
