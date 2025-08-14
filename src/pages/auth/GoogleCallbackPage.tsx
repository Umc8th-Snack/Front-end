import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/shared/context/AuthContext';
import { useGoogleLogin } from '@/shared/hooks/useAuth';
import { extractAuthCode, extractAuthError } from '@/shared/utils/googleAuth';

/**
 * Google OAuth 콜백 페이지
 * Google 인증 후 리다이렉트되는 페이지로, 인가 코드를 처리합니다.
 */
const GoogleCallbackPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const googleLoginMutation = useGoogleLogin();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleCallback = async () => {
            // URL에서 인가 코드 추출
            const code = extractAuthCode(window.location.search);
            const error = extractAuthError(window.location.search);

            // 에러가 있는 경우 (사용자가 인증을 취소한 경우 등)
            if (error) {
                console.error('❌ [GOOGLE CALLBACK] OAuth 에러:', error);
                setError('Google 로그인이 취소되었습니다.');
                setTimeout(() => {
                    void navigate('/', { replace: true });
                }, 2000);
                return;
            }

            // 인가 코드가 없는 경우
            if (!code) {
                console.error('❌ [GOOGLE CALLBACK] 인가 코드가 없습니다');
                setError('잘못된 요청입니다.');
                setTimeout(() => {
                    void navigate('/', { replace: true });
                }, 2000);
                return;
            }

            console.log('🔵 [GOOGLE CALLBACK] 인가 코드 수신:', code.substring(0, 10) + '...');

            try {
                // 백엔드로 인가 코드 전송 및 로그인 처리
                const response = await googleLoginMutation.mutateAsync(code);

                console.log('✅ [GOOGLE CALLBACK] 로그인 성공:', {
                    userId: response.data.userId,
                    email: response.data.email,
                    isNewUser: response.data.isNewUser,
                });

                // AuthContext에 토큰과 사용자 정보 저장 (login 함수에서 토큰 저장 처리)
                login(response.token, {
                    userId: response.data.userId,
                    email: response.data.email,
                    nickname: response.data.nickname,
                });

                // 신규 회원인 경우 추가 정보 입력 페이지로 이동 (선택적)
                if (response.data.isNewUser) {
                    console.log('🆕 [GOOGLE CALLBACK] 신규 회원 - 추가 정보 입력 필요');
                    // navigate('/onboarding', { replace: true });
                    void navigate('/', { replace: true }); // 일단 홈으로 이동
                } else {
                    // 기존 회원은 홈으로 이동
                    void navigate('/', { replace: true });
                }
            } catch (error) {
                console.error('❌ [GOOGLE CALLBACK] 로그인 실패:', error);
                setError('로그인 처리 중 오류가 발생했습니다.');
                setTimeout(() => {
                    void navigate('/', { replace: true });
                }, 2000);
            }
        };

        void handleCallback();
    }, [navigate, login, googleLoginMutation]);

    // 로딩/에러 UI
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="text-center">
                {error ? (
                    <div className="rounded-lg bg-white p-8 shadow-lg">
                        <div className="mb-4 text-red-500">
                            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <h2 className="mb-2 text-xl font-semibold text-gray-800">로그인 실패</h2>
                        <p className="text-gray-600">{error}</p>
                        <p className="mt-4 text-sm text-gray-500">잠시 후 홈으로 이동합니다...</p>
                    </div>
                ) : (
                    <div className="rounded-lg bg-white p-8 shadow-lg">
                        <div className="mb-4">
                            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
                        </div>
                        <h2 className="mb-2 text-xl font-semibold text-gray-800">Google 로그인 처리 중</h2>
                        <p className="text-gray-600">잠시만 기다려주세요...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GoogleCallbackPage;
