import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Languages, Upload, Settings, LogOut, User, FileType } from 'lucide-react';

const Layout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logout();
        }
    };

    const navItems = [
        { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/preference', icon: <Languages size={20} />, label: 'Config' },
        { path: '/file-type', icon: <FileType size={20} />, label: 'New Job' },
        { path: '/profile', icon: <User size={20} />, label: 'Profile' },
    ];

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                        LinguaSkill
                    </h1>
                    <p className="text-xs text-gray-400 mt-1">AI-Powered Vocational Learning</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                                    : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-100'
                                }`
                            }
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                <div className="relative p-8 max-w-7xl mx-auto h-full">
                    <header className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-semibold text-gray-200">Welcome, {user?.full_name || user?.email}</h2>
                        <div className="flex items-center gap-4">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs border border-emerald-500/30">
                                {user?.preferred_language?.toUpperCase() || 'EN'}
                            </span>
                        </div>
                    </header>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
