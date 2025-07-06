import { Outlet, useLocation } from 'react-router-dom';

import Navbar from '@/shared/components/Navbar/Navbar';

const MainLayout = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <div className="min-h-screen bg-gray-50">
            {!isAuthPage && (
                <header className="bg-white shadow">
                    <Navbar />
                </header>
            )}
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
