import { API_CONFIG } from '@/shared/constants/apiConstants';

const KAKAO_AUTHORIZE_ENDPOINT = '/api/auth/kakao/authorize';

/**
 * Kakao OAuth 인증을 시작할 백엔드 authorize 엔드포인트 URL
 * - 백엔드가 302로 Kakao 인증 페이지로 리다이렉트한다.
 */
export const getKakaoAuthUrl = (): string => {
    return new URL(KAKAO_AUTHORIZE_ENDPOINT, API_CONFIG.BASE_URL).toString();
};

/**
 * Kakao 로그인 플로우 진입
 * - 브라우저를 백엔드 authorize 엔드포인트로 이동시켜 OAuth를 시작한다.
 */
export const redirectToKakaoLogin = (): void => {
    window.location.href = getKakaoAuthUrl();
};
