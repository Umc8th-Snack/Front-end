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
            const token = tokenUtils.getAccessToken();
            if (token) {
                // TODO: 토큰으로 사용자 정보 조회 API 호출 또는 localStorage에서 사용자 정보 복원
                const savedUser = localStorage.getItem('user');
                if (savedUser) {
                    setUser(JSON.parse(savedUser));
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = useCallback((token: string, userData: User) => {
        tokenUtils.setAccessToken(token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    }, []);

    const logout = useCallback(() => {
        tokenUtils.removeAccessToken();
        localStorage.removeItem('user');
        setUser(null);
        // TODO: 로그아웃 API 호출 (refresh token 무효화)
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
