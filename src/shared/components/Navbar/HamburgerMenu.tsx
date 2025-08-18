import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HamburgerMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onShowConsentModal: () => void;
}

const HamburgerMenu = ({ isOpen, onClose, onShowConsentModal }: HamburgerMenuProps) => {
    const location = useLocation();
    const menuRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
                        <h2 className="text-lg font-semibold">메뉴</h2>
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

                            <button
                                onClick={() => {
                                    onShowConsentModal();
                                    onClose();
                                }}
                                className="animate-in fade-in slide-in-from-right block w-full rounded-lg p-3 text-left transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-md"
                                style={{ animationDelay: '600ms' }}
                            >
                                설정
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default HamburgerMenu;
