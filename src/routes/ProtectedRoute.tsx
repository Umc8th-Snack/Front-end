import { type ReactNode, useEffect, useRef, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import LoginModal from '@/shared/components/modal/loginModal/LoginModal';
import LoginRequiredModal from '@/shared/components/modal/LoginRequiredModal/LoginRequiredModal';
import { useAuth } from '@/shared/context/AuthContext';

interface ProtectedRouteProps {
    redirectPath?: string;
    children?: ReactNode;
    useModal?: boolean;
}

type SuppressState = { suppressAuthModal?: boolean };
const hasSuppress = (v: unknown): v is SuppressState => typeof v === 'object' && v !== null && 'suppressAuthModal' in v;

const ProtectedRoute = ({ redirectPath = '/', children, useModal = true }: ProtectedRouteProps) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [showRequired, setShowRequired] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const prevAuthRef = useRef(isAuthenticated);
    useEffect(() => {
        prevAuthRef.current = isAuthenticated;
    }, [isAuthenticated]);
    const isLogoutTransition = prevAuthRef.current && !isAuthenticated;

    const suppress = hasSuppress(location.state) && !!location.state.suppressAuthModal;

    if (loading) return <div>로딩 중...</div>;

    if (!isAuthenticated) {
        // 로그아웃 시 LoginRequiredModal flicker 방지
        if (isLogoutTransition) {
            return <Navigate to="/" replace state={{ suppressAuthModal: true }} />;
        }
        if (!useModal) {
            return <Navigate to={redirectPath} replace state={{ from: location.pathname + location.search }} />;
        }

        if (!showRequired && !showLogin && !suppress) setShowRequired(true);

        return (
            <>
                {showRequired && !showLogin && (
                    <LoginRequiredModal
                        open={showRequired}
                        onClose={() => {
                            setShowRequired(false);
                            void navigate('/', { replace: true });
                        }}
                        onAuthClick={() => {
                            setShowRequired(false);
                            setShowLogin(true);
                        }}
                    />
                )}
                <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
            </>
        );
    }

    return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
