import { Outlet } from 'react-router-dom';

import Navbar from '@/shared/components/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-white">
            {
                <header>
                    <Navbar />
                </header>
            }
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
