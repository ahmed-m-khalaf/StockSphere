import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Top Navigation */}
            <Navbar />

            {/* Main Content Area */}
            <div className="flex flex-1">
                {/* Left Sidebar */}
                <Sidebar />

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-6 overflow-auto">
                    <div className="max-w-6xl mx-auto animate-fade-in">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
