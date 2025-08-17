import { type ReactNode, useEffect, useRef, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import LoginModal from '@/shared/components/modal/loginModal/LoginModal';
import LoginRequiredModal from '@/shared/components/modal/LoginRequiredModal/LoginRequiredModal';
import { useAuth } from '@/shared/context/AuthContext';

interface ProtectedRouteProps {
    redirectPath?: string;
    children?: ReactNode;
    useModal?: boolean; // 모달 사용 여부
}

type SuppressState = { suppressAuthModal?: boolean }; // NEW
const hasSuppress = (v: unknown): v is SuppressState => typeof v === 'object' && v !== null && 'suppressAuthModal' in v; // NEW

const ProtectedRoute = ({ redirectPath = '/', children, useModal = true }: ProtectedRouteProps) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [showRequired, setShowRequired] = useState(false); // NEW
    const [showLogin, setShowLogin] = useState(false); // NEW

    const prevAuthRef = useRef(isAuthenticated); // NEW
    useEffect(() => {
        prevAuthRef.current = isAuthenticated;
    }, [isAuthenticated]);

    const isLogoutTransition = prevAuthRef.current && !isAuthenticated;
    const suppress = hasSuppress(location.state) && !!location.state.suppressAuthModal;

    // effect에서 모달 오픈 트리거 (렌더 중 setState X)
    useEffect(() => {
        if (!isAuthenticated) {
            if (useModal && !showLogin && !suppress && !isLogoutTransition) {
                setShowRequired(true);
            }
        } else {
            // 로그인 완료 시 모달/로그인모달 닫기
            setShowRequired(false);
            setShowLogin(false);
        }
    }, [isAuthenticated, useModal, showLogin, suppress, isLogoutTransition]);

    // 훅 순서 보장을 위해 단일 return 패턴 사용
    let content: ReactNode = null;

    if (loading) {
        content = <div>로딩 중...</div>;
    } else if (!isAuthenticated) {
        if (isLogoutTransition) {
            // 로그아웃 직후 깜빡임 방지, 모달 억제 플래그 전달
            content = <Navigate to="/" replace state={{ suppressAuthModal: true }} />;
        } else if (!useModal) {
            // 모달 미사용 시 리디렉트, 돌아올 경로 저장
            content = <Navigate to={redirectPath} replace state={{ from: location.pathname + location.search }} />;
        } else {
            // 모달 플로우
            content = (
                <>
                    {showRequired && !showLogin && !suppress && (
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
    } else {
        content = children ? <>{children}</> : <Outlet />;
    }

    return <>{content}</>;
};

export default ProtectedRoute;
