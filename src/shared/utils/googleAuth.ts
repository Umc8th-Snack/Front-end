/**
 * Google OAuth 인증 관련 유틸리티
 */

/**
 * Google OAuth 인증 URL 생성
 * @returns Google OAuth 인증 페이지 URL
 */
export const getGoogleAuthUrl = (): string => {
    // 환경변수에서 Google Client ID 가져오기
    // 임시로 placeholder 사용 (나중에 환경변수로 교체)
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID';

    // 리다이렉트 URI 설정 (현재 도메인 + 콜백 경로)
    const REDIRECT_URI = `${window.location.origin}/auth/google/callback`;

    // OAuth 2.0 인가 요청 파라미터 설정
    const params = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: 'code', // 인가 코드 플로우 사용
        scope: 'email profile openid', // 필요한 권한 스코프
        access_type: 'offline', // Refresh Token 발급을 위해 필요
        prompt: 'consent', // 항상 동의 화면 표시 (refresh token 발급 보장)
    });

    // Google OAuth 2.0 인증 엔드포인트
    const GOOGLE_AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';

    return `${GOOGLE_AUTH_ENDPOINT}?${params.toString()}`;
};

/**
 * URL에서 인가 코드 추출
 * @param search - window.location.search
 * @returns 인가 코드 또는 null
 */
export const extractAuthCode = (search: string): string | null => {
    const params = new URLSearchParams(search);
    return params.get('code');
};

/**
 * URL에서 에러 추출
 * @param search - window.location.search
 * @returns 에러 메시지 또는 null
 */
export const extractAuthError = (search: string): string | null => {
    const params = new URLSearchParams(search);
    return params.get('error');
};
