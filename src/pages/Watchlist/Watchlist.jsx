import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWatchlist } from '../../context/WatchlistContext';

export default function Watchlist() {
    const { watchlist, removeFromWatchlist, clearWatchlist } = useWatchlist();

    const handleRemove = (symbol) => removeFromWatchlist(symbol);

    const handleClearAll = () => {
        if (window.confirm('Clear your entire watchlist?')) clearWatchlist();
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    if (watchlist.length === 0) {
        return (
            <motion.div
                className="flex flex-col items-center justify-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <motion.div
                    className="text-6xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    ⭐
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Watchlist is Empty</h2>
                <p className="text-gray-500 mb-6 text-center max-w-md">
                    Start building your watchlist by clicking the star icon on any stock.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                        to="/"
                        className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                    >
                        Explore Stocks
                    </Link>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Header */}
            <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Watchlist</h1>
                    <p className="text-gray-500 mt-1">Tracking {watchlist.length} stock{watchlist.length > 1 ? 's' : ''}</p>
                </div>
                <motion.button
                    onClick={handleClearAll}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                >
                    Clear All
                </motion.button>
            </motion.div>

            {/* Desktop Table */}
            <motion.div
                className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Symbol</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Price</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Change</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <motion.tbody
                        className="divide-y divide-gray-100"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {watchlist.map((stock) => (
                            <motion.tr
                                key={stock.symbol}
                                variants={itemVariants}
                                className="hover:bg-gray-50 transition-colors"
                                whileHover={{ backgroundColor: 'rgba(0,102,255,0.02)' }}
                            >
                                <td className="px-6 py-4">
                                    <Link to={`/stock/${stock.symbol}`} className="font-semibold text-primary-600 hover:text-primary-700">
                                        {stock.symbol}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{stock.name}</td>
                                <td className="px-6 py-4 text-right font-medium text-gray-900">${(stock.price || 0).toFixed(2)}</td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${stock.positive ? 'bg-success-500/10 text-success-600' : 'bg-danger-500/10 text-danger-600'}`}>
                                        {stock.positive ? '+' : ''}{(stock.change || 0).toFixed(2)}%
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <motion.button
                                        onClick={() => handleRemove(stock.symbol)}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-2 text-gray-400 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-all"
                                    >
                                        🗑️
                                    </motion.button>
                                </td>
                            </motion.tr>
                        ))}
                    </motion.tbody>
                </table>
            </motion.div>

            {/* Mobile Cards */}
            <motion.div
                className="md:hidden space-y-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {watchlist.map((stock) => (
                    <motion.div
                        key={stock.symbol}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <Link to={`/stock/${stock.symbol}`} className="font-bold text-lg text-gray-900 hover:text-primary-600">
                                {stock.symbol}
                            </Link>
                            <button onClick={() => handleRemove(stock.symbol)} className="p-2 text-gray-400 hover:text-danger-600">🗑️</button>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{stock.name}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-semibold text-gray-900">${(stock.price || 0).toFixed(2)}</span>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${stock.positive ? 'bg-success-500/10 text-success-600' : 'bg-danger-500/10 text-danger-600'}`}>
                                {stock.positive ? '+' : ''}{(stock.change || 0).toFixed(2)}%
                            </span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
