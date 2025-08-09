import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/shared/context/AuthContext';

interface ProtectedRouteProps {
    redirectPath?: string;
    children?: ReactNode;
}

const ProtectedRoute = ({ redirectPath = '/', children }: ProtectedRouteProps) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
