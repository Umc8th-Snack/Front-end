import { Link, Outlet, useLocation } from 'react-router-dom';

import SnackIcon from '@/assets/snack.svg?react';

const MainLayout = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <div className="min-h-screen bg-gray-50">
            {!isAuthPage && (
                <header className="bg-white shadow">
                    <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
                                    <SnackIcon width={80} />
                                </Link>
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link
                                        to="/"
                                        className={`rounded-md px-3 py-2 text-sm font-medium ${
                                            location.pathname === '/'
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-700 hover:bg-gray-700 hover:text-white'
                                        }`}
                                    >
                                        홈/메인피드
                                    </Link>
                                    <Link
                                        to="/custom-feed"
                                        className={`rounded-md px-3 py-2 text-sm font-medium ${
                                            location.pathname === '/custom-feed'
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-700 hover:bg-gray-700 hover:text-white'
                                        }`}
                                    >
                                        맞춤피드
                                    </Link>
                                    <Link
                                        to="/mypage"
                                        className={`rounded-md px-3 py-2 text-sm font-medium ${
                                            location.pathname === '/mypage'
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-700 hover:bg-gray-700 hover:text-white'
                                        }`}
                                    >
                                        마이페이지
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                                    로그인/회원가입
                                </Link>
                            </div>
                        </div>
                    </nav>
                </header>
            )}
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
