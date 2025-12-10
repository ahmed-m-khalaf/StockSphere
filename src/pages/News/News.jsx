import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMarketNews } from '../../services/stockApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState('general');

    const categories = [
        { id: 'general', label: 'General' },
        { id: 'forex', label: 'Forex' },
        { id: 'crypto', label: 'Crypto' },
        { id: 'merger', label: 'Mergers' },
    ];

    const mockNews = [
        { id: 1, headline: 'Fed Signals Potential Rate Cuts in 2024', summary: 'Federal Reserve officials indicated they may begin cutting interest rates.', source: 'Reuters', datetime: Math.floor(Date.now() / 1000) - 7200, url: '#', image: 'https://picsum.photos/seed/fed/600/400' },
        { id: 2, headline: 'Tech Giants Lead Market Rally', summary: 'Major technology companies saw significant gains.', source: 'Bloomberg', datetime: Math.floor(Date.now() / 1000) - 14400, url: '#', image: 'https://picsum.photos/seed/tech/600/400' },
        { id: 3, headline: 'Apple Unveils New M4 MacBook Pro', summary: 'Apple announced its latest MacBook Pro lineup.', source: 'CNBC', datetime: Math.floor(Date.now() / 1000) - 18000, url: '#', image: 'https://picsum.photos/seed/apple/600/400' },
        { id: 4, headline: 'Oil Prices Surge on Middle East Tensions', summary: 'Crude oil prices jumped over 3%.', source: 'Financial Times', datetime: Math.floor(Date.now() / 1000) - 21600, url: '#', image: 'https://picsum.photos/seed/oil/600/400' },
        { id: 5, headline: 'Tesla Announces Record Q4 Deliveries', summary: 'Tesla reported record vehicle deliveries.', source: 'MarketWatch', datetime: Math.floor(Date.now() / 1000) - 28800, url: '#', image: 'https://picsum.photos/seed/tesla/600/400' },
        { id: 6, headline: 'Cryptocurrency Market Sees Renewed Interest', summary: 'Bitcoin rallied following new ETF approvals.', source: 'CoinDesk', datetime: Math.floor(Date.now() / 1000) - 36000, url: '#', image: 'https://picsum.photos/seed/crypto/600/400' },
    ];

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null);
            try {
                const articles = await getMarketNews(category);
                if (articles?.length > 0) {
                    setNews(articles.slice(0, 12));
                } else {
                    setNews(mockNews);
                    setError('Showing demo news');
                }
            } catch {
                setNews(mockNews);
                setError('Showing demo news');
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [category]);

    const formatTimeAgo = (timestamp) => {
        const seconds = Math.floor((Date.now() / 1000) - timestamp);
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-2xl font-bold text-gray-900">Market News</h1>
                <p className="text-gray-500 mt-1">Stay updated with the latest financial news</p>
            </motion.div>

            {error && (
                <motion.div
                    className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-xl text-sm"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    ⚠️ {error}
                </motion.div>
            )}

            {/* Category Filter */}
            <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                {categories.map((cat, i) => (
                    <motion.button
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === cat.id ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {cat.label}
                    </motion.button>
                ))}
            </motion.div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <LoadingSpinner size="lg" text="Loading news..." />
                </div>
            ) : (
                <>
                    {/* Featured News */}
                    {news[0] && (
                        <motion.a
                            href={news[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.01, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid md:grid-cols-2">
                                <div className="p-6 md:p-8 flex flex-col justify-center">
                                    <span className="inline-block px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full w-fit mb-4">Featured</span>
                                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3 line-clamp-2">{news[0].headline}</h2>
                                    <p className="text-gray-300 mb-4 line-clamp-2">{news[0].summary}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <span>{news[0].source}</span>
                                        <span>•</span>
                                        <span>{formatTimeAgo(news[0].datetime)}</span>
                                    </div>
                                </div>
                                <div className="h-48 md:h-auto bg-gray-700">
                                    {news[0].image && <img src={news[0].image} alt="" className="w-full h-full object-cover" />}
                                </div>
                            </div>
                        </motion.a>
                    )}

                    {/* News Grid */}
                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {news.slice(1).map((article, index) => (
                            <motion.a
                                key={`${article.id}-${index}`}
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group"
                                variants={itemVariants}
                                whileHover={{ y: -5, boxShadow: '0 20px 40px -15px rgba(0,0,0,0.15)' }}
                            >
                                <div className="h-40 bg-gray-100 overflow-hidden">
                                    {article.image && (
                                        <motion.img
                                            src={article.image}
                                            alt=""
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    )}
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">{category}</span>
                                        <span className="text-xs text-gray-400">{formatTimeAgo(article.datetime)}</span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">{article.headline}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-2">{article.summary}</p>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                </>
            )}
        </motion.div>
    );
}
