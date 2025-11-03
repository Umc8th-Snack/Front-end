import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { userApi } from '@/shared/apis/user';
import { LOGIN_METHOD_STORAGE_KEY, LOGIN_PROVIDER_HINT_KEY } from '@/shared/constants/authConstants';
import { type LoginMethod, useAuth } from '@/shared/context/AuthContext';
import { tokenUtils } from '@/shared/utils/auth';

const AuthSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        const toLoginMethod = (value: string | null | undefined): LoginMethod | null => {
            if (value === 'email' || value === 'kakao' || value === 'google' || value === 'unknown') {
                return value;
            }
            return null;
        };

        const determineLoginMethod = (): LoginMethod => {
            const providerFromParam = toLoginMethod(searchParams.get('provider'));

            const providerHintRaw = sessionStorage.getItem(LOGIN_PROVIDER_HINT_KEY);
            const providerFromHint = toLoginMethod(providerHintRaw);
            if (providerHintRaw) {
                sessionStorage.removeItem(LOGIN_PROVIDER_HINT_KEY);
            }

            const storedMethod = toLoginMethod(localStorage.getItem(LOGIN_METHOD_STORAGE_KEY));

            const resolvedMethod = providerFromParam ?? providerFromHint ?? storedMethod ?? 'unknown';
            console.log('🧭 [AUTH SUCCESS] 로그인 방식 판별:', resolvedMethod);
            return resolvedMethod;
        };

        const handleAuthSuccess = async () => {
            console.log('🔄 [AUTH SUCCESS] OAuth 콜백 처리 시작');
            console.log('📝 [AUTH SUCCESS] URL 파라미터:', Object.fromEntries(searchParams));

            const loginMethod = determineLoginMethod();

            // URL 파라미터에서 에러 확인
            const error = searchParams.get('error');
            if (error) {
                console.error('❌ [AUTH SUCCESS] 인증 실패:', error);
                setErrorMessage('로그인에 실패했습니다. 다시 시도해주세요.');
                setTimeout(() => {
                    void navigate('/');
                }, 3000);
                return;
            }

            try {
                // 1. URL 파라미터에서 토큰 확인
                const accessToken = searchParams.get('accessToken') || searchParams.get('access_token');

                if (accessToken) {
                    console.log('✅ [AUTH SUCCESS] URL에서 토큰 발견:', accessToken.substring(0, 20) + '...');
                    tokenUtils.setAccessToken(accessToken);
                } else {
                    console.log('⚠️ [AUTH SUCCESS] URL에 토큰이 없음, 백엔드가 쿠키로 설정했을 가능성');

                    // 2. 백엔드가 HttpOnly 쿠키로 토큰을 설정했을 수 있으므로,
                    // 바로 사용자 정보 API를 호출해봄
                    console.log('🔍 [AUTH SUCCESS] 사용자 정보 API로 인증 확인 시도');
                }

                // 3. 사용자 정보 조회 시도
                console.log('📡 [AUTH SUCCESS] 사용자 정보 조회 시작');
                const userInfo = await userApi.getMyInfo();

                console.log('✅ [AUTH SUCCESS] 사용자 정보 조회 성공:', {
                    userId: userInfo.userId,
                    email: userInfo.email,
                    nickname: userInfo.nickname,
                });

                // 4. 응답 헤더나 바디에서 토큰 확인 (백엔드 구현에 따라 다름)
                // 이미 인터셉터에서 처리될 수도 있음
                const currentToken = tokenUtils.getAccessToken();

                if (!currentToken && !accessToken) {
                    console.warn('⚠️ [AUTH SUCCESS] 토큰을 찾을 수 없지만 사용자 정보는 조회됨');
                    // HttpOnly 쿠키로 인증되었을 가능성이 높음
                    // 이 경우 토큰을 직접 관리할 수 없지만, 쿠키로 인증은 유지됨
                }

                // 5. AuthContext에 사용자 정보 저장
                const userData = {
                    userId: userInfo.userId,
                    nickname: userInfo.nickname,
                    email: userInfo.email,
                };

                // 토큰이 있으면 login 함수 호출, 없으면 사용자 정보만으로도 처리
                if (accessToken || currentToken) {
                    login(accessToken || currentToken || '', userData, loginMethod);
                    console.log('✅ [AUTH SUCCESS] 로그인 완료 (토큰 저장)');
                } else {
                    // HttpOnly 쿠키 방식인 경우, 토큰 없이 사용자 정보만 저장
                    console.log('✅ [AUTH SUCCESS] 로그인 완료 (HttpOnly 쿠키 방식)');
                    login('http-only-cookie', userData, loginMethod);
                }

                console.log('🏠 [AUTH SUCCESS] 홈으로 이동');
                void navigate('/', { replace: true });
            } catch (error) {
                console.error('❌ [AUTH SUCCESS] 처리 실패:', error);

                // localStorage에 이미 토큰이 있는지 확인
                const existingToken = tokenUtils.getAccessToken();
                if (existingToken) {
                    console.log('⚠️ [AUTH SUCCESS] 기존 토큰으로 재시도');
                    try {
                        const userInfo = await userApi.getMyInfo();
                        const userData = {
                            userId: userInfo.userId,
                            nickname: userInfo.nickname,
                            email: userInfo.email,
                        };
                        login(existingToken, userData, loginMethod);
                        void navigate('/', { replace: true });
                        return;
                    } catch (retryError) {
                        console.error('❌ [AUTH SUCCESS] 재시도 실패:', retryError);
                    }
                }

                setErrorMessage('로그인 처리 중 오류가 발생했습니다.');
                setTimeout(() => {
                    void navigate('/');
                }, 3000);
            }
        };

        void handleAuthSuccess();
    }, [searchParams, navigate, login]);

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                {errorMessage ? (
                    <>
                        <p className="text-18px-medium mb-2 text-red-600">{errorMessage}</p>
                        <p className="text-14px-regular text-gray-500">잠시 후 홈으로 이동합니다...</p>
                    </>
                ) : (
                    <>
                        <div className="mb-4">
                            <div className="border-main inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-r-transparent"></div>
                        </div>
                        <p className="text-18px-medium text-gray-700">로그인 처리 중입니다...</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthSuccessPage;
