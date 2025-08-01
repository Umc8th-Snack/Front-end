import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { tokenUtils } from '@/shared/utils/auth';

interface User {
    id: string;
    nickname: string;
    email?: string;
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
                // TODO: 토큰으로 사용자 정보 조회 API 호출
                // 임시로 더미 데이터 설정
                setUser({ id: '1', nickname: '스내커' });
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = (token: string, userData: User) => {
        tokenUtils.setAccessToken(token);
        setUser(userData);
    };

    const logout = () => {
        tokenUtils.removeAccessToken();
        setUser(null);
        // TODO: 로그아웃 API 호출 (refresh token 무효화)
    };

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
