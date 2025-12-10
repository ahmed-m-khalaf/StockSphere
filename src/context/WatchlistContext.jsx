import { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();

/**
 * Watchlist Provider - Manages stock watchlist with LocalStorage persistence
 */
export function WatchlistProvider({ children }) {
    const [watchlist, setWatchlist] = useState(() => {
        const saved = localStorage.getItem('stockpulse-watchlist');
        return saved ? JSON.parse(saved) : [];
    });

    // Persist to LocalStorage whenever watchlist changes
    useEffect(() => {
        localStorage.setItem('stockpulse-watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (stock) => {
        setWatchlist((prev) => {
            if (prev.find((s) => s.symbol === stock.symbol)) {
                return prev; // Already exists
            }
            return [...prev, stock];
        });
    };

    const removeFromWatchlist = (symbol) => {
        setWatchlist((prev) => prev.filter((s) => s.symbol !== symbol));
    };

    const isInWatchlist = (symbol) => {
        return watchlist.some((s) => s.symbol === symbol);
    };

    const clearWatchlist = () => {
        setWatchlist([]);
    };

    return (
        <WatchlistContext.Provider
            value={{
                watchlist,
                addToWatchlist,
                removeFromWatchlist,
                isInWatchlist,
                clearWatchlist,
            }}
        >
            {children}
        </WatchlistContext.Provider>
    );
}

/**
 * Custom hook to use watchlist context
 */
export function useWatchlist() {
    const context = useContext(WatchlistContext);
    if (!context) {
        throw new Error('useWatchlist must be used within a WatchlistProvider');
    }
    return context;
}
