import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import SearchIcon from '@/shared/assets/search.svg?react';
import SnackLogo from '@/shared/assets/snack.svg?react';
import LoginModal from '@/shared/components/modal/loginModal/LoginModal';
import { useAuth } from '@/shared/context/AuthContext';

import ConsentModal from '../modal/ConsentModal/ConsentModal';
import SettingsDropdown from '../modal/SettingsDropdown/SettingsDropdown';
import SearchDropdown from './SearchDropdown';

const Navbar = () => {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    //정보동의설정 모달 상태
    const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);

    const handleOpenConsentModal = () => {
        setIsConsentModalOpen(true);
    };

    const handleCloseConsentModal = () => {
        setIsConsentModalOpen(false);
    };

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const dropdownActive = searchOpen && suggestions.length > 0;

    return (
        <header className="w-full">
            <div className="mx-auto flex h-[120px] w-full max-w-[1200px] items-center justify-between px-4 py-8 lg:px-0">
                {/* 로고 */}
                <div className="flex items-center">
                    <Link to="/" className="flex shrink-0 items-center">
                        <SnackLogo className="h-[55px] w-[120px] lg:h-[64px] lg:w-[140px]" />
                    </Link>

                    <div className="relative mx-4 w-full max-w-[555px] min-w-[250px] flex-1">
                        <div
                            className={`border-main flex h-[40px] items-center gap-4 rounded-[24px] border px-4 py-2 transition-all lg:h-[45px] lg:min-w-[410px] ${searchOpen ? 'rounded-b-none border-b-0 bg-white' : ''}`}
                        >
                            <input
                                type="text"
                                placeholder="찾고싶은 기사가 있나요?"
                                value={searchValue}
                                className="placeholder: text-18px-medium lg:text-20px-medium text-main-70 w-full pl-1 outline-none focus:outline-none"
                                onChange={(e) => {
                                    const v = e.target.value;
                                    setSearchValue(v);

                                    // 예시: 값이 없거나 매칭이 없으면 suggestions 비우기
                                    if (!v.trim()) {
                                        setSuggestions([]);
                                    } else {
                                        // TODO: 실제 API 연동 시 결과 없으면 [] 세팅
                                        setSuggestions(['예시1', '예시2', '예시3']); // 또는 []
                                    }

                                    setSearchOpen(true);
                                }}
                                onFocus={() => setSearchOpen(true)}
                            />
                            <button className="hover:cursor-pointer">
                                <SearchIcon className="h-6 w-6 lg:h-7 lg:w-7" />
                            </button>
                        </div>

                        <SearchDropdown
                            open={dropdownActive}
                            suggestions={suggestions}
                            onSelect={(val) => setSearchValue(val)}
                            setOpen={setSearchOpen}
                        />
                    </div>
                </div>

                {/* 우측 메뉴 */}
                <nav className="text-18px-medium lg:text-20px-medium flex shrink-0 items-center gap-6 text-black select-none lg:gap-8">
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
                                to="/article"
                                className={`hover:text-main transition-colors ${location.pathname === '/article' ? 'text-main' : ''}`}
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
                                className="hover:text-main transition-colors"
                                onClick={() => setIsLoginModalOpen(true)}
                            >
                                회원가입/로그인
                            </button>
                            <Link to="/" className="hover:text-main transition-colors">
                                홈 화면
                            </Link>
                        </>
                    )}
                </nav>
                {isConsentModalOpen && <ConsentModal onClose={handleCloseConsentModal} />}
            </div>

            {/* 로그인 모달 */}
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </header>
    );
};

export default Navbar;
