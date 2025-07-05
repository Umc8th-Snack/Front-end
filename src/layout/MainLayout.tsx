import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import LoginModal from '../pages/login/components/LoginModal';

const MainLayout = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {!isAuthPage && (
                <header className="bg-white shadow">
                    <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <Link to="/" className="text-xl font-bold text-gray-900">
                                    Snack
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
                                        홈
                                    </Link>
                                    <Link
                                        to="/article"
                                        className={`rounded-md px-3 py-2 text-sm font-medium ${
                                            location.pathname === '/article'
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-700 hover:bg-gray-700 hover:text-white'
                                        }`}
                                    >
                                        기사
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
                                {/* <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                                    로그인
                                </Link> */}
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                    로그인
                                </button>
                                <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

                                <Link
                                    to="/signup"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                                >
                                    회원가입
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
