import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { userApi } from '@/shared/apis/user';
import { LOGIN_METHOD_STORAGE_KEY } from '@/shared/constants/authConstants';
import { tokenUtils } from '@/shared/utils/auth';

interface User {
    userId: number;
    nickname: string;
    email: string;
}

export type LoginMethod = 'email' | 'kakao' | 'google' | 'unknown';

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string, user: User, method: LoginMethod) => void;
    logout: () => void;
    loading: boolean;
    loginMethod: LoginMethod | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const isInitializing = useRef(false); // 중복 초기화 방지용 플래그
    const [loginMethod, setLoginMethod] = useState<LoginMethod | null>(null);

    const isAuthenticated = !!user && tokenUtils.hasAccessToken();

    useEffect(() => {
        // 이미 초기화 중이면 중복 실행 방지
        if (isInitializing.current) {
            console.log('⏭️ [AUTH CONTEXT] 이미 초기화 진행 중, 중복 실행 방지');
            return;
        }

        const initializeAuth = async () => {
            isInitializing.current = true; // 초기화 시작 표시
            console.log('🔄 [AUTH CONTEXT] 인증 상태 초기화 시작');

            const savedLoginMethod = localStorage.getItem(LOGIN_METHOD_STORAGE_KEY) as LoginMethod | null;
            if (savedLoginMethod) {
                setLoginMethod(savedLoginMethod);
            } else {
                setLoginMethod(null);
            }

            const token = tokenUtils.getAccessToken();
            if (token) {
                console.log('🎫 [AUTH CONTEXT] 저장된 토큰 발견');

                try {
                    // /api/users/me API 호출하여 사용자 정보 조회
                    const userInfo = await userApi.getMyInfo();

                    // API에서 받은 정보를 User 타입에 맞게 변환
                    const userData: User = {
                        userId: userInfo.userId,
                        nickname: userInfo.nickname,
                        email: userInfo.email,
                    };

                    setUser(userData);
                    localStorage.setItem('user', JSON.stringify(userData));

                    console.log('✅ [AUTH CONTEXT] API로 사용자 정보 조회 성공:', {
                        userId: userData.userId,
                        email: userData.email,
                    });
                } catch (error) {
                    console.error('❌ [AUTH CONTEXT] 사용자 정보 조회 실패:', error);

                    // API 실패 시 localStorage에서 복원 시도 (fallback)
                    const savedUser = localStorage.getItem('user');
                    if (savedUser) {
                        const userData = JSON.parse(savedUser);
                        setUser(userData);
                        console.log('⚠️ [AUTH CONTEXT] localStorage에서 사용자 정보 복원');
                    } else {
                        // 토큰은 있지만 사용자 정보를 가져올 수 없는 경우
                        console.log('⚠️ [AUTH CONTEXT] 토큰은 있지만 사용자 정보 없음');
                        tokenUtils.removeAccessToken(); // 유효하지 않은 토큰 제거
                        localStorage.removeItem(LOGIN_METHOD_STORAGE_KEY);
                        setLoginMethod(null);
                    }
                }
            } else {
                console.log('❌ [AUTH CONTEXT] 저장된 토큰 없음');
                localStorage.removeItem(LOGIN_METHOD_STORAGE_KEY);
                setLoginMethod(null);
            }
            setLoading(false);
            console.log('✅ [AUTH CONTEXT] 인증 상태 초기화 완료');
        };

        void initializeAuth();
    }, []);

    const login = useCallback((token: string, userData: User, method: LoginMethod) => {
        console.log('🔐 [AUTH CONTEXT] 로그인 처리 시작:', { userId: userData.userId, email: userData.email });

        // Access Token만 localStorage에 저장 (Refresh Token은 HttpOnly 쿠키로 자동 관리)
        tokenUtils.setAccessToken(token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem(LOGIN_METHOD_STORAGE_KEY, method);
        setUser(userData);
        setLoginMethod(method);

        console.log('✅ [AUTH CONTEXT] 로그인 상태 업데이트 완료');
    }, []);

    const logout = useCallback(() => {
        console.log('🚪 [AUTH CONTEXT] 로그아웃 처리 시작');

        // Access Token만 삭제 (Refresh Token은 서버에서 쿠키 무효화)
        tokenUtils.removeAccessToken();
        localStorage.removeItem('user');
        localStorage.removeItem(LOGIN_METHOD_STORAGE_KEY);
        setUser(null);
        setLoginMethod(null);

        console.log('✅ [AUTH CONTEXT] 로컬 상태 정리 완료');
        // NOTE: logout API 호출은 useLogout hook에서 처리
    }, []);

    const value = useMemo<AuthContextType>(
        () => ({
            isAuthenticated,
            user,
            login,
            logout,
            loading,
            loginMethod,
        }),
        [isAuthenticated, user, login, logout, loading, loginMethod]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthProvider;
