import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/shared/context/AuthContext';
import { useLogout } from '@/shared/hooks/useAuth';

interface HamburgerMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onShowConsentModal: () => void;
}

const HamburgerMenu = ({ isOpen, onClose, onShowConsentModal }: HamburgerMenuProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout: authLogout, user, loginMethod } = useAuth();
    const logoutMutation = useLogout();
    const menuRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const handleMouseLeave = () => {
            // 마우스가 메뉴를 벗어나면 300ms 후에 닫기
            timeoutRef.current = setTimeout(() => {
                onClose();
            }, 300);
        };

        const handleMouseEnter = () => {
            // 마우스가 다시 메뉴로 들어오면 타이머 취소
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };

        const menuElement = menuRef.current;
        if (menuElement) {
            menuElement.addEventListener('mouseleave', handleMouseLeave);
            menuElement.addEventListener('mouseenter', handleMouseEnter);

            return () => {
                menuElement.removeEventListener('mouseleave', handleMouseLeave);
                menuElement.removeEventListener('mouseenter', handleMouseEnter);
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            };
        }

        // menuElement가 null인 경우에도 cleanup 함수 반환
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isOpen, onClose]);

    const handleLogout = async () => {
        console.log('🚪 [HAMBURGER MENU] 로그아웃 버튼 클릭');

        try {
            await logoutMutation.mutateAsync();
            console.log('✅ [HAMBURGER MENU] 서버 로그아웃 API 성공');
            authLogout();
            void navigate('/');
            onClose();
        } catch (error) {
            console.error('❌ [HAMBURGER MENU] 로그아웃 중 오류 발생:', error);
            authLogout();
            void navigate('/');
            onClose();
        }
    };

    const isSocialLogin = loginMethod === 'kakao' || loginMethod === 'google';

    const handleSettingsClick = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    const settingItems = isSocialLogin
        ? [
              { action: 'consent', label: '정보 동의 설정' },
              { action: 'delete', label: '회원 탈퇴' },
              { action: 'logout', label: '로그아웃' },
          ]
        : [
              { action: 'password', label: '비밀번호 변경' },
              { action: 'email', label: '이메일 변경' },
              { action: 'consent', label: '정보 동의 설정' },
              { action: 'delete', label: '회원 탈퇴' },
              { action: 'logout', label: '로그아웃' },
          ];

    const handleSettingItemClick = (action: string) => {
        setIsSettingsOpen(false);
        onClose();

        switch (action) {
            case 'consent':
                onShowConsentModal();
                break;
            case 'password':
                void navigate('/settings/password');
                break;
            case 'email':
                void navigate('/settings/email');
                break;
            case 'delete':
                void navigate('/settings/delete');
                break;
            case 'logout':
                void handleLogout();
                break;
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* 오버레이 */}
            <div
                className="animate-in fade-in fixed inset-0 z-40 bg-black/50 duration-300"
                onClick={onClose}
                onKeyDown={(e) => {
                    if (e.key === 'Escape') onClose();
                }}
                role="button"
                tabIndex={0}
                aria-label="메뉴 닫기"
            />

            {/* 메뉴 */}
            <div
                ref={menuRef}
                className="animate-in slide-in-from-right fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-lg duration-500 ease-out"
            >
                <div className="flex h-full flex-col">
                    {/* 헤더 */}
                    <div className="animate-in fade-in slide-in-from-top flex items-center justify-start px-7 pt-7 pb-2 delay-200 duration-700">
                        {/* 모바일에서는 닉네임, 태블릿에서는 "메뉴" 표시 */}
                        <div className="sm:hidden">
                            <h2 className="text-lg font-semibold">
                                <span className="font-bold">{user?.nickname}</span>님
                            </h2>
                            <div className="mt-1 h-px w-16 bg-gray-300"></div>
                        </div>
                        <div className="hidden sm:block">
                            <h2 className="text-lg font-semibold">메뉴</h2>
                        </div>
                    </div>

                    {/* 메뉴 아이템들 */}
                    <nav className="flex-1 p-4">
                        <div className="space-y-4">
                            <Link
                                to="/"
                                onClick={onClose}
                                className={`animate-in fade-in slide-in-from-right block rounded-lg p-3 transition-all duration-300 hover:scale-105 ${
                                    location.pathname === '/'
                                        ? 'bg-main text-white shadow-lg'
                                        : 'hover:bg-gray-100 hover:shadow-md'
                                }`}
                                style={{ animationDelay: '300ms' }}
                            >
                                메인피드
                            </Link>

                            <Link
                                to="/custom-feed"
                                onClick={onClose}
                                className={`animate-in fade-in slide-in-from-right block rounded-lg p-3 transition-all duration-300 hover:scale-105 ${
                                    location.pathname === '/custom-feed'
                                        ? 'bg-main text-white shadow-lg'
                                        : 'hover:bg-gray-100 hover:shadow-md'
                                }`}
                                style={{ animationDelay: '400ms' }}
                            >
                                맞춤피드
                            </Link>

                            <Link
                                to="/mypage"
                                onClick={onClose}
                                className={`animate-in fade-in slide-in-from-right block rounded-lg p-3 transition-all duration-300 hover:scale-105 ${
                                    location.pathname === '/mypage'
                                        ? 'bg-main text-white shadow-lg'
                                        : 'hover:bg-gray-100 hover:shadow-md'
                                }`}
                                style={{ animationDelay: '500ms' }}
                            >
                                마이페이지
                            </Link>

                            {/* 설정 메뉴 */}
                            <div className="animate-in fade-in slide-in-from-right" style={{ animationDelay: '600ms' }}>
                                <button
                                    onClick={handleSettingsClick}
                                    className="block w-full cursor-pointer rounded-lg p-3 text-left transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-md"
                                >
                                    <div className="flex items-center justify-between">
                                        <span>설정</span>
                                        <svg
                                            className={`h-4 w-4 transition-transform duration-200 ${
                                                isSettingsOpen ? 'rotate-180' : ''
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                </button>

                                {/* 설정 하위 메뉴 */}
                                {isSettingsOpen && (
                                    <div className="mt-2 ml-4 space-y-2">
                                        {settingItems.map((item) => (
                                            <button
                                                key={item.action}
                                                onClick={() => handleSettingItemClick(item.action)}
                                                className="block w-full cursor-pointer rounded-lg p-2 text-left text-sm transition-all duration-200 hover:bg-gray-50"
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default HamburgerMenu;
