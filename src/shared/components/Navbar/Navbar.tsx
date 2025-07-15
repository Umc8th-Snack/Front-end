import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import SearchIcon from '@/shared/assets/search.svg?react';
import SnackLogo from '@/shared/assets/snack.svg?react';

const Navbar = () => {
    // 임시 로그인 상태 (true면 로그인된 상태)
    const [isLoggedIn] = useState(false);
    const [nickname] = useState('스내커');
    const location = useLocation();

    return (
        <header className="w-full">
            <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-6 px-10 py-6">
                {/* 로고 */}
                <div className="flex items-center">
                    <Link to="/" className="flex shrink-0 items-center">
                        <SnackLogo width={140} />
                    </Link>

                    {/* 검색창 */}
                    <div className="mx-8 flex w-[700px] min-w-[200px] flex-1 gap-4 rounded-full border border-[#0557E0] px-4 py-2 outline-none focus:ring-1 focus:ring-blue-400">
                        <input
                            type="text"
                            placeholder="찾고싶은 기사가 있나요?"
                            className="placeholder: w-full pl-1 text-[20px] text-[#0557E0] outline-none focus:outline-none"
                        />
                        <button className="hover:cursor-pointer">
                            <SearchIcon width={38} />
                        </button>
                    </div>
                </div>

                {/* 우측 메뉴 */}
                <nav className="flex shrink-0 items-center gap-4 text-[20px] font-medium text-black select-none">
                    {isLoggedIn ? (
                        <>
                            <p>
                                <span className="font-bold">{nickname}</span>님
                            </p>
                            <Link
                                to="/mypage"
                                className={`transition-colors hover:text-[#0557E0] ${location.pathname === '/mypage' ? 'text-[#0557E0]' : ''}`}
                            >
                                마이페이지
                            </Link>
                            <Link
                                to="/"
                                className={`transition-colors hover:text-[#0557E0] ${location.pathname === '/' ? 'text-[#0557E0]' : ''}`}
                            >
                                메인피드
                            </Link>
                            <Link
                                to="/article"
                                className={`transition-colors hover:text-[#0557E0] ${location.pathname === '/article' ? 'text-[#0557E0]' : ''}`}
                            >
                                맞춤피드
                            </Link>
                            <button className="cursor-pointer transition-colors hover:text-[#0557E0]">설정</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="transition-colors hover:text-[#0557E0]">
                                로그인
                            </Link>
                            <Link to="/" className="transition-colors hover:text-[#0557E0]">
                                홈 화면
                            </Link>
                            <Link to="/mypage" className="transition-colors hover:text-[#0557E0]">
                                마이페이지
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
