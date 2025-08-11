import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { tokenUtils } from '@/shared/utils/auth';

interface User {
    userId: number;
    nickname: string;
    email: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user && tokenUtils.hasAccessToken();

    useEffect(() => {
        const initializeAuth = () => {
            console.log('🔄 [AUTH CONTEXT] 인증 상태 초기화 시작');

            const token = tokenUtils.getAccessToken();
            if (token) {
                console.log('🎫 [AUTH CONTEXT] 저장된 토큰 발견');
                // TODO: /api/users/me API 호출하여 사용자 정보 조회 (현재는 localStorage 사용)
                const savedUser = localStorage.getItem('user');
                if (savedUser) {
                    const userData = JSON.parse(savedUser);
                    setUser(userData);
                    console.log('✅ [AUTH CONTEXT] 사용자 정보 복원 완료:', {
                        userId: userData.userId,
                        email: userData.email,
                    });
                } else {
                    console.log('⚠️ [AUTH CONTEXT] 토큰은 있지만 사용자 정보가 없음');
                }
            } else {
                console.log('❌ [AUTH CONTEXT] 저장된 토큰 없음');
            }
            setLoading(false);
            console.log('✅ [AUTH CONTEXT] 인증 상태 초기화 완료');
        };

        initializeAuth();
    }, []);

    const login = useCallback((token: string, userData: User) => {
        console.log('🔐 [AUTH CONTEXT] 로그인 처리 시작:', { userId: userData.userId, email: userData.email });

        // Access Token만 localStorage에 저장 (Refresh Token은 HttpOnly 쿠키로 자동 관리)
        tokenUtils.setAccessToken(token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);

        console.log('✅ [AUTH CONTEXT] 로그인 상태 업데이트 완료');
    }, []);

    const logout = useCallback(() => {
        console.log('🚪 [AUTH CONTEXT] 로그아웃 처리 시작');

        // Access Token만 삭제 (Refresh Token은 서버에서 쿠키 무효화)
        tokenUtils.removeAccessToken();
        localStorage.removeItem('user');
        setUser(null);

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
        }),
        [isAuthenticated, user, login, logout, loading]
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
