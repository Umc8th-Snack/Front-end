import { Outlet } from 'react-router-dom';


import Navbar from '@/shared/components/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {
                <header className="bg-white shadow">
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
