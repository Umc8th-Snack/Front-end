import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    isAuthenticated?: boolean;
    redirectPath?: string;
    children?: ReactNode;
}

const ProtectedRoute = ({ isAuthenticated = false, redirectPath = '/', children }: ProtectedRouteProps) => {
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
