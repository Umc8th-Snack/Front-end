import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import SearchIcon from '@/shared/assets/search.svg?react';
import SnackLogo from '@/shared/assets/snack.svg?react';
import LoginModal from '@/shared/components/modal/loginModal/LoginModal';
import { useAuth } from '@/shared/context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    return (
        <header className="w-full">
            <div className="mx-auto flex h-[120px] w-full max-w-[1200px] items-center justify-between px-4 py-8 lg:px-0">
                {/* 로고 */}
                <div className="flex items-center">
                    <Link to="/" className="flex shrink-0 items-center">
                        <SnackLogo className="h-[55px] w-[120px] lg:h-[64px] lg:w-[140px]" />
                    </Link>

                    {/* 검색창 */}
                    <div className="border-main mx-4 flex h-[40px] w-full max-w-[555px] min-w-[250px] flex-1 gap-4 rounded-full border px-4 py-2 outline-none focus:ring-1 focus:ring-blue-400 lg:h-[45px] lg:min-w-[410px]">
                        <input
                            type="text"
                            placeholder="찾고싶은 기사가 있나요?"
                            className="placeholder: text-18px-medium lg:text-20px-medium text-main-70 w-full pl-1 outline-none focus:outline-none"
                        />
                        <button className="hover:cursor-pointer">
                            <SearchIcon className="h-6 w-6 lg:h-7 lg:w-7" />
                        </button>
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
                            <button className="hover:text-main cursor-pointer transition-colors">설정</button>
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
                            <button className="hover:text-main cursor-pointer transition-colors">설정</button>
                        </>
                    )}
                </nav>
            </div>

            {/* 로그인 모달 */}
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </header>
    );
};

export default Navbar;
