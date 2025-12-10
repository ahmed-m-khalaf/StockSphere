import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const location = useLocation();

    const menuItems = [
        { path: '/', label: 'Dashboard', icon: '📊', description: 'Market overview' },
        { path: '/watchlist', label: 'Watchlist', icon: '⭐', description: 'Your saved stocks' },
        { path: '/news', label: 'Market News', icon: '📰', description: 'Latest updates' },
    ];

    const quickLinks = [
        { symbol: 'AAPL', name: 'Apple Inc.', change: '+1.25%', positive: true },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', change: '-0.45%', positive: false },
        { symbol: 'MSFT', name: 'Microsoft', change: '+2.10%', positive: true },
        { symbol: 'TSLA', name: 'Tesla Inc.', change: '+0.78%', positive: true },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
            {/* Navigation Menu */}
            <div className="p-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Navigation
                </h3>
                <nav className="flex flex-col gap-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${isActive(item.path)
                                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <span className="text-xl group-hover:scale-110 transition-transform">
                                {item.icon}
                            </span>
                            <div className="flex flex-col">
                                <span className="font-medium text-sm">{item.label}</span>
                                <span className="text-xs text-gray-400">{item.description}</span>
                            </div>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Divider */}
            <div className="mx-4 border-t border-gray-100" />

            {/* Quick Access Stocks */}
            <div className="p-4 flex-1">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Quick Access
                </h3>
                <div className="flex flex-col gap-2">
                    {quickLinks.map((stock) => (
                        <Link
                            key={stock.symbol}
                            to={`/stock/${stock.symbol}`}
                            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition-all group"
                        >
                            <div className="flex flex-col">
                                <span className="font-semibold text-sm text-gray-800 group-hover:text-primary-600 transition-colors">
                                    {stock.symbol}
                                </span>
                                <span className="text-xs text-gray-400 truncate max-w-[120px]">
                                    {stock.name}
                                </span>
                            </div>
                            <span
                                className={`text-xs font-medium px-2 py-0.5 rounded-full ${stock.positive
                                        ? 'bg-success-500/10 text-success-600'
                                        : 'bg-danger-500/10 text-danger-600'
                                    }`}
                            >
                                {stock.change}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Market Status */}
            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-2 px-3 py-2 bg-success-500/10 rounded-lg">
                    <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-success-700">Market Open</span>
                </div>
            </div>
        </aside>
    );
}
