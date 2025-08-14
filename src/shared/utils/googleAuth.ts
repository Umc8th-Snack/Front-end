/**
 * Google OAuth 인증 관련 유틸리티
 * 백엔드 주도 OAuth 플로우를 지원하는 버전
 */

/**
 * 백엔드에서 Google OAuth URL을 직접 생성하고 리다이렉트
 * 백엔드가 /api/auth/google/callback로 직접 처리
 * @returns Google OAuth 인증 페이지 URL (백엔드가 생성)
 */
export const getGoogleAuthUrl = (): string => {
    // 백엔드가 OAuth 플로우를 처리하므로, 백엔드 엔드포인트로 직접 리다이렉트
    // 백엔드가 /api/auth/google/callback에서 콜백을 받아 처리 후 홈(/)으로 리다이렉트
    const BACKEND_OAUTH_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth/google/callback`;

    // 환경변수에서 Google Client ID 가져오기 (백엔드가 사용)
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    // OAuth 2.0 인가 요청 파라미터 설정
    const params = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: BACKEND_OAUTH_URL,
        response_type: 'code',
        scope: 'email profile openid',
        access_type: 'offline',
        prompt: 'consent',
    });

    // Google OAuth 2.0 인증 엔드포인트
    const GOOGLE_AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';

    return `${GOOGLE_AUTH_ENDPOINT}?${params.toString()}`;
};
