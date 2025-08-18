import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import SettingsDropdown from '@/pages/settings/components/SettingsDropdown/SettingsDropdown';
import MiniLogo from '@/shared/assets/minisnack.svg?react';
import SnackLogo from '@/shared/assets/snack.svg?react';
import LoginModal from '@/shared/components/modal/loginModal/LoginModal';
import HamburgerMenu from '@/shared/components/navbar/HamburgerMenu';
import SearchBar from '@/shared/components/navbar/SearchBar';
import { useAuth } from '@/shared/context/AuthContext';

import ConsentModal from '../modal/ConsentModal/ConsentModal';

const Navbar = () => {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    //정보동의설정 모달 상태
    const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);

    const handleOpenConsentModal = () => {
        setIsConsentModalOpen(true);
    };

    const handleCloseConsentModal = () => {
        setIsConsentModalOpen(false);
    };

    const handleHamburgerToggle = () => {
        setIsHamburgerOpen(!isHamburgerOpen);
    };

    const handleCloseHamburger = () => {
        setIsHamburgerOpen(false);
    };

    return (
        <header className="w-full">
            <div className="mx-auto flex h-[100px] w-full max-w-[1200px] items-center justify-between px-4 py-6 md:h-[110px] md:py-7 lg:h-[120px] lg:py-8">
                {/* 로고 */}
                <div className="flex flex-1 items-center">
                    <Link to="/" className="flex shrink-0 items-center">
                        {/* 모바일에서는 쿠키 아이콘, 태블릿/PC에서는 스낵 로고 */}
                        <div className="block md:hidden">
                            <MiniLogo className="w-[50px] sm:w-[60px]" />
                        </div>
                        <div className="hidden md:block">
                            <SnackLogo className="w-[110px] lg:w-[130px]" />
                        </div>
                    </Link>
                    {/* 모바일에서 비로그인 상태일 때는 검색바 숨김 */}
                    <div className={`${!isAuthenticated ? 'hidden sm:block' : ''}`}>
                        <SearchBar />
                    </div>
                </div>

                {/* 우측 메뉴 - PC에서만 표시 */}
                <nav className="text-18px-medium lg:text-20px-medium hidden shrink-0 items-center gap-6 px-2 text-black select-none lg:flex lg:gap-8">
                    {isAuthenticated ? (
                        <>
                            <p>
                                <span className="font-bold">{user?.nickname}</span>님
                            </p>
                            <Link
                                to="/mypage"
                                className={`hover:text-main transition-colors ${location.pathname === '/mypage' ? 'text-main' : ''}`}
                            >
                                마이페이지
                            </Link>
                            <Link
                                to="/"
                                className={`hover:text-main transition-colors ${location.pathname === '/' ? 'text-main' : ''}`}
                            >
                                메인피드
                            </Link>
                            <Link
                                to="/custom-feed"
                                className={`hover:text-main transition-colors ${location.pathname === '/custom-feed' ? 'text-main' : ''}`}
                            >
                                맞춤피드
                            </Link>
                            {/* 설정 버튼 */}
                            <div className="relative">
                                <button
                                    onClick={() => setSettingsOpen((prev) => !prev)}
                                    className="hover:text-main cursor-pointer transition-colors"
                                >
                                    설정
                                </button>
                                <SettingsDropdown
                                    open={settingsOpen}
                                    setOpen={setSettingsOpen}
                                    onShowConsentModal={handleOpenConsentModal}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <button
                                className="hover:text-main cursor-pointer transition-colors"
                                onClick={() => setIsLoginModalOpen(true)}
                            >
                                회원가입/로그인
                            </button>
                        </>
                    )}
                </nav>

                {/* 태블릿용 사용자 정보 및 햄버거 메뉴 */}
                <div className="flex items-center gap-4 lg:hidden">
                    {isAuthenticated ? (
                        <>
                            {/* 태블릿에서만 닉네임 표시, 모바일에서는 제거 */}
                            <p className="text-16px-medium hidden sm:block">
                                <span className="font-bold">{user?.nickname}</span>님
                            </p>
                            <button
                                onClick={handleHamburgerToggle}
                                className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-100"
                                aria-label="메뉴 열기"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <path d="M3 12h18M3 6h18M3 18h18" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <button
                            className="text-16px-medium hover:text-main cursor-pointer transition-colors"
                            onClick={() => setIsLoginModalOpen(true)}
                        >
                            회원가입/로그인
                        </button>
                    )}
                </div>
            </div>

            {/* 햄버거 메뉴 */}
            <HamburgerMenu
                isOpen={isHamburgerOpen}
                onClose={handleCloseHamburger}
                onShowConsentModal={handleOpenConsentModal}
            />

            {isConsentModalOpen && <ConsentModal onClose={handleCloseConsentModal} />}
            {/* 로그인 모달 */}
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </header>
    );
};

export default Navbar;
