import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();
    const { isDark, toggleTheme } = useTheme();

    const navItems = [
        {
            label: 'Markets',
            dropdown: [
                { label: 'Stocks', path: '/', icon: '📈' },
                { label: 'News', path: '/news', icon: '📰' },
            ],
        },
        {
            label: 'Tools',
            dropdown: [
                { label: 'Watchlist', path: '/watchlist', icon: '⭐' },
                { label: 'Dashboard', path: '/', icon: '📊' },
            ],
        },
        { label: 'News', path: '/news' },
        { label: 'Watchlist', path: '/watchlist' },
    ];

    const isActive = (path) => location.pathname === path;

    const handleDropdownEnter = (label) => setActiveDropdown(label);
    const handleDropdownLeave = () => setActiveDropdown(null);

    return (
        <nav className="sticky top-0 z-50 bg-[#1a1f36]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">S</span>
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">
                            StockSphere
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <div
                                key={item.label}
                                className="relative"
                                onMouseEnter={() => item.dropdown && handleDropdownEnter(item.label)}
                                onMouseLeave={handleDropdownLeave}
                            >
                                {item.dropdown ? (
                                    <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                        {item.label}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`px-4 py-2 text-sm font-medium transition-colors ${isActive(item.path) ? 'text-white' : 'text-gray-300 hover:text-white'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                )}

                                {/* Dropdown Menu */}
                                {item.dropdown && activeDropdown === item.label && (
                                    <div className="absolute top-full left-0 pt-2 w-48">
                                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                                            {item.dropdown.map((subItem) => (
                                                <Link
                                                    key={subItem.label}
                                                    to={subItem.path}
                                                    onClick={() => setActiveDropdown(null)}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                                                >
                                                    <span>{subItem.icon}</span>
                                                    <span>{subItem.label}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right Side - Auth & Theme */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                            title={isDark ? 'Light Mode' : 'Dark Mode'}
                        >
                            {isDark ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            )}
                        </button>

                        {/* Login */}
                        <Link
                            to="/login"
                            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Log in
                        </Link>

                        {/* Sign Up CTA */}
                        <Link
                            to="/register"
                            className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-primary-500/25"
                        >
                            Try Free
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-2">
                        <button onClick={toggleTheme} className="p-2 text-gray-400">
                            {isDark ? '☀️' : '🌙'}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-300 hover:text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-white/10 animate-fade-in">
                        <div className="space-y-1">
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-white">Dashboard</Link>
                            <Link to="/watchlist" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-white">Watchlist</Link>
                            <Link to="/news" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-white">News</Link>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-white">Log in</Link>
                            <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block mx-4 px-4 py-3 bg-primary-500 text-white text-center rounded-lg font-semibold">Try Free</Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
