import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for fetching data with loading and error states
 * @param {Function} fetchFn - Async function that returns data
 * @param {Array} deps - Dependency array for useEffect
 * @returns {Object} - { data, loading, error, refetch }
 */
export function useFetch(fetchFn, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFn();
            setData(result);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchFn]);

    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, refetch]);

    return { data, loading, error, refetch };
}

/**
 * Format large numbers (e.g., market cap)
 * @param {number} num - Number to format
 * @returns {string} - Formatted string (e.g., "2.5T", "150B")
 */
export function formatNumber(num) {
    if (!num) return 'N/A';
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
}

/**
 * Get date range for API calls
 * @param {string} range - "1D", "1W", "1M", "3M", "1Y"
 * @returns {Object} - { from, to } as Unix timestamps
 */
export function getDateRange(range) {
    const now = Math.floor(Date.now() / 1000);
    const day = 86400;

    switch (range) {
        case '1D':
            return { from: now - day, to: now };
        case '1W':
            return { from: now - 7 * day, to: now };
        case '1M':
            return { from: now - 30 * day, to: now };
        case '3M':
            return { from: now - 90 * day, to: now };
        case '1Y':
            return { from: now - 365 * day, to: now };
        default:
            return { from: now - 30 * day, to: now };
    }
}
