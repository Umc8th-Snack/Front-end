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
        return api.post<LoginResponseTypes>('/api/auth/login', loginData);
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
        const result = await api.post<void>('/api/auth/logout');
        console.log('✅ [AUTH API] 로그아웃 완료 - Refresh Token 쿠키 무효화됨');
        return result;
    },

    /**
     * 토큰 재발급
     */
    reissueToken: async (): Promise<LoginResponseTypes> => {
        return api.post<LoginResponseTypes>('/api/auth/reissue');
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

        const response = await api.post<SignupResponseTypes>('/api/users/signup', signupData);

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

    /**
     * 회원 탈퇴
     */
    withdraw: async (password: string): Promise<void> => {
        return api.post<void>('/api/users/me/withdraw', { password });
    },

    /**
     * 비밀번호 변경
     */
    changePassword: async (payload: {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
    }): Promise<void> => {
        return api.patch<void>('/api/users/me/password', payload);
    },

    /**
     * 이메일 변경
     */
    changeEmail: async (payload: {
        newEmail: string;
        password: string;
    }): Promise<{ email: string; updatedAt: string }> => {
        return api.patch<{ email: string; updatedAt: string }>('/api/users/me/email', payload);
    },

    /**
     * 비밀번호 재설정 - 인증 코드 발송 (인증 불필요)
     * 로그인하지 않은 사용자가 비밀번호를 찾을 때 사용
     */
    sendPasswordResetCode: async (email: string): Promise<void> => {
        // 비밀번호 찾기 API는 public API이므로 인증 헤더 불필요
        const response = await axiosInstance.post('/api/users/password-reset/send-code', { email });

        if (!response.data.isSuccess) {
            throw new Error(response.data.message || '인증 코드 발송에 실패했습니다.');
        }

        return response.data.result;
    },

    /**
     * 비밀번호 재설정 - 인증 코드 검증 (인증 불필요)
     * 이메일로 받은 인증 코드를 확인
     */
    verifyPasswordResetCode: async (email: string, code: string): Promise<void> => {
        // 비밀번호 찾기 API는 public API이므로 인증 헤더 불필요
        const response = await axiosInstance.post('/api/users/password-reset/verify-code', { email, code });

        if (!response.data.isSuccess) {
            // 에러 코드와 함께 에러 객체 생성 (기존 에러 핸들링과 호환)
            const error: any = new Error(response.data.message || '인증 코드 확인에 실패했습니다.');
            error.response = {
                data: {
                    code: response.data.code,
                    message: response.data.message,
                },
            };
            throw error;
        }

        // 서버가 result: null을 반환하므로 void 반환
        return;
    },

    /**
     * 비밀번호 재설정 - 새 비밀번호 설정 (인증 불필요)
     * 인증 코드 검증 후 새 비밀번호 설정
     */
    setNewPassword: async (data: { email: string; newPassword: string; confirmPassword: string }): Promise<void> => {
        // 비밀번호 찾기 API는 public API이므로 인증 헤더 불필요
        const response = await axiosInstance.post('/api/users/password-reset/set-new-password', data);

        if (!response.data.isSuccess) {
            const error: any = new Error(response.data.message || '비밀번호 설정에 실패했습니다.');
            error.response = {
                data: {
                    code: response.data.code,
                    message: response.data.message,
                },
            };
            throw error;
        }

        return response.data.result;
    },
};
