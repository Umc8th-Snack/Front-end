import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import SearchIcon from '@/shared/assets/search.svg?react';
import SnackLogo from '@/shared/assets/snack.svg?react';

const Navbar = () => {
    // 임시 로그인 상태 (true면 로그인된 상태)
    const [isLoggedIn] = useState(true);
    const [nickname] = useState('스내커');
    const location = useLocation();

    return (
        <header className="w-full">
            <div className="mx-auto flex h-[120px] max-w-screen-2xl items-center justify-between gap-10 px-18 py-6">
                {/* 로고 */}
                <div className="flex items-center">
                    <Link to="/" className="flex shrink-0 items-center">
                        <SnackLogo width={140} />
                    </Link>

                    {/* 검색창 */}
                    <div className="border-main mx-8 flex h-[45px] w-[555px] min-w-[200px] flex-1 gap-4 rounded-full border px-4 py-2 outline-none focus:ring-1 focus:ring-blue-400">
                        <input
                            type="text"
                            placeholder="찾고싶은 기사가 있나요?"
                            className="placeholder: text-20px-medium text-main w-full pl-1 outline-none focus:outline-none"
                        />
                        <button className="hover:cursor-pointer">
                            <SearchIcon width={28} height={28} />
                        </button>
                    </div>
                </div>

                {/* 우측 메뉴 */}
                <nav className="text-20px-medium flex shrink-0 items-center gap-8 text-black select-none">
                    {isLoggedIn ? (
                        <>
                            <p>
                                <span className="font-bold">{nickname}</span>님
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
                            <Link to="/" className="hover:text-main transition-colors">
                                회원가입/로그인
                            </Link>
                            <Link to="/" className="hover:text-main transition-colors">
                                홈 화면
                            </Link>
                            <button className="hover:text-main cursor-pointer transition-colors">설정</button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
