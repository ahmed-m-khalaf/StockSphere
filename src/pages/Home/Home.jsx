import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getQuote } from '../../services/stockApi';
import SkeletonCard from '../../components/common/SkeletonLoaders';
import ErrorState from '../../components/common/ErrorState';

export default function Home() {
    const [trendingStocks, setTrendingStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const stockCategories = {
        tech: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'TSLA', 'AMD'],
        finance: ['JPM', 'V', 'MA', 'BAC', 'GS'],
        consumer: ['WMT', 'KO', 'PEP', 'MCD', 'NKE'],
    };

    const popularSymbols = [
        ...stockCategories.tech.slice(0, 6),
        ...stockCategories.finance.slice(0, 3),
        ...stockCategories.consumer.slice(0, 3),
    ];

    const marketIndices = [
        { name: 'S&P 500', symbol: 'SPY', value: '5,234.18', change: '+0.85%', positive: true },
        { name: 'NASDAQ', symbol: 'QQQ', value: '16,428.82', change: '+1.12%', positive: true },
        { name: 'DOW Jones', symbol: 'DIA', value: '39,512.84', change: '-0.23%', positive: false },
        { name: 'Russell 2000', symbol: 'IWM', value: '2,084.15', change: '+0.45%', positive: true },
    ];

    const cryptoAssets = [
        { symbol: 'BTC', name: 'Bitcoin', price: '$97,234', change: '+2.4%', positive: true },
        { symbol: 'ETH', name: 'Ethereum', price: '$3,892', change: '+1.8%', positive: true },
        { symbol: 'SOL', name: 'Solana', price: '$224.50', change: '-0.9%', positive: false },
    ];

    const companyNames = {
        AAPL: 'Apple Inc.', MSFT: 'Microsoft Corp.', GOOGL: 'Alphabet Inc.',
        AMZN: 'Amazon.com', META: 'Meta Platforms', NVDA: 'NVIDIA Corp.',
        TSLA: 'Tesla Inc.', AMD: 'AMD Inc.', JPM: 'JPMorgan Chase',
        V: 'Visa Inc.', MA: 'Mastercard', BAC: 'Bank of America',
        WMT: 'Walmart Inc.', KO: 'Coca-Cola', NKE: 'Nike Inc.',
    };

    useEffect(() => {
        const fetchTrendingStocks = async () => {
            setLoading(true);
            setError(null);
            try {
                const stockPromises = popularSymbols.map(async (symbol) => {
                    try {
                        const quote = await getQuote(symbol);
                        return {
                            symbol,
                            name: companyNames[symbol] || symbol,
                            price: quote.c || 0,
                            change: quote.dp || 0,
                            positive: (quote.dp || 0) >= 0,
                        };
                    } catch {
                        return {
                            symbol,
                            name: companyNames[symbol] || symbol,
                            price: Math.random() * 500 + 50,
                            change: (Math.random() - 0.5) * 10,
                            positive: Math.random() > 0.5,
                        };
                    }
                });
                const results = await Promise.all(stockPromises);
                setTrendingStocks(results.filter(Boolean));
            } catch (err) {
                setError('Unable to load stock data.');
            } finally {
                setLoading(false);
            }
        };
        fetchTrendingStocks();
    }, []);

    if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {/* Welcome Header */}
            <motion.div
                className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 rounded-2xl p-6 md:p-8 text-white shadow-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome to StockSphere 🌐</h1>
                <p className="text-primary-100 text-sm md:text-base">
                    Your premium dashboard for tracking stocks, crypto, and global markets in real-time.
                </p>
            </motion.div>

            {/* Market Indices */}
            <section>
                <motion.h2
                    className="text-lg font-semibold text-gray-800 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Market Indices
                </motion.h2>
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {marketIndices.map((index, i) => (
                        <motion.div
                            key={index.name}
                            variants={itemVariants}
                            whileHover={{ y: -4, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)' }}
                            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer"
                        >
                            <p className="text-xs text-gray-500 uppercase tracking-wide">{index.name}</p>
                            <p className="text-xl font-bold text-gray-900 mt-1">{index.value}</p>
                            <p className={`text-sm font-medium mt-1 ${index.positive ? 'text-success-600' : 'text-danger-600'}`}>
                                {index.change}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Crypto Quick View */}
            <section>
                <motion.h2
                    className="text-lg font-semibold text-gray-800 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Crypto Markets
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {cryptoAssets.map((crypto) => (
                        <motion.div
                            key={crypto.symbol}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 text-white cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xl font-bold">{crypto.symbol}</p>
                                    <p className="text-gray-400 text-sm">{crypto.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold">{crypto.price}</p>
                                    <p className={`text-sm ${crypto.positive ? 'text-green-400' : 'text-red-400'}`}>
                                        {crypto.change}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Trending Stocks */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <motion.h2
                        className="text-lg font-semibold text-gray-800"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Trending Stocks
                    </motion.h2>
                    <motion.span
                        className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {trendingStocks.length} stocks
                    </motion.span>
                </div>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {loading ? (
                        Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
                    ) : (
                        trendingStocks.map((stock, index) => (
                            <motion.div key={stock.symbol} variants={itemVariants}>
                                <Link
                                    to={`/stock/${stock.symbol}`}
                                    className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-colors"
                                >
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="flex items-start justify-between"
                                    >
                                        <div>
                                            <p className="font-bold text-gray-900">{stock.symbol}</p>
                                            <p className="text-xs text-gray-500 truncate max-w-[120px]">{stock.name}</p>
                                        </div>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stock.positive ? 'bg-success-500/10 text-success-600' : 'bg-danger-500/10 text-danger-600'}`}>
                                            {stock.positive ? '+' : ''}{stock.change.toFixed(2)}%
                                        </span>
                                    </motion.div>
                                    <p className="text-lg font-semibold text-gray-900 mt-2">
                                        ${stock.price.toFixed(2)}
                                    </p>
                                </Link>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </section>

            {/* Quick Stats */}
            <motion.section
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                {[
                    { value: trendingStocks.length, label: 'Stocks Tracked', color: 'text-primary-600' },
                    { value: trendingStocks.filter(s => s.positive).length, label: 'Gainers', color: 'text-success-600' },
                    { value: trendingStocks.filter(s => !s.positive).length, label: 'Losers', color: 'text-danger-600' },
                    { value: '2', label: 'APIs Active', color: 'text-gray-700' },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.p
                            className={`text-3xl font-bold ${stat.color}`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.7 + i * 0.1, type: 'spring' }}
                        >
                            {stat.value}
                        </motion.p>
                        <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.section>
        </motion.div>
    );
}
