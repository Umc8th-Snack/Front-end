/**
 * Google OAuth 인증 관련 유틸리티
 */

import api from '@/shared/apis/api';

/**
 * Google OAuth 인증 URL 생성
 * @returns Google OAuth 인증 페이지 URL
 */
export const getGoogleAuthUrl = (): string => {
    // 환경변수에서 Google Client ID 가져오기
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    // 환경변수에서 Redirect URI 가져오기 (Google Console에 등록된 URL)
    const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

    // OAuth 2.0 인가 요청 파라미터 설정
    const params = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: 'code',
        scope: 'email profile openid',
        access_type: 'offline',
        prompt: 'consent',
    });

    // Google OAuth 2.0 인증 엔드포인트
    const GOOGLE_AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';

    return `${GOOGLE_AUTH_ENDPOINT}?${params.toString()}`;
};

/**
 * Google OAuth 콜백 처리 - 인가 코드를 백엔드로 전송
 * @param code - Google OAuth 인가 코드
 * @returns 로그인 응답 (토큰 포함)
 */
export const handleGoogleCallback = async (code: string) => {
    try {
        const response = await api.get('/auth/google/callback', {
            params: { code },
        });
        return response.data;
    } catch (error) {
        console.error('❌ Google OAuth 콜백 처리 실패:', error);
        throw error;
    }
};
