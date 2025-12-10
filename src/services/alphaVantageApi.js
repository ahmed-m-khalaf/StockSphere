/**
 * StockSphere - Alpha Vantage API Service
 * Used for historical data and global markets
 */

import axios from 'axios';

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

/**
 * Get real-time quote for a stock
 * @param {string} symbol - Stock symbol (e.g., 'AAPL')
 */
export const getQuoteAV = async (symbol) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: 'GLOBAL_QUOTE',
                symbol,
                apikey: API_KEY,
            },
        });

        const quote = response.data['Global Quote'];
        if (!quote || Object.keys(quote).length === 0) {
            throw new Error('No data found');
        }

        return {
            symbol: quote['01. symbol'],
            price: parseFloat(quote['05. price']),
            change: parseFloat(quote['09. change']),
            changePercent: parseFloat(quote['10. change percent']?.replace('%', '')),
            high: parseFloat(quote['03. high']),
            low: parseFloat(quote['04. low']),
            open: parseFloat(quote['02. open']),
            prevClose: parseFloat(quote['08. previous close']),
            volume: parseInt(quote['06. volume']),
        };
    } catch (error) {
        console.error('Alpha Vantage quote error:', error);
        throw error;
    }
};

/**
 * Get daily time series (historical data)
 * @param {string} symbol - Stock symbol
 * @param {string} outputsize - 'compact' (100 days) or 'full' (20+ years)
 */
export const getDailyTimeSeries = async (symbol, outputsize = 'compact') => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: 'TIME_SERIES_DAILY',
                symbol,
                outputsize,
                apikey: API_KEY,
            },
        });

        const timeSeries = response.data['Time Series (Daily)'];
        if (!timeSeries) {
            throw new Error('No historical data found');
        }

        // Convert to array format for charts
        return Object.entries(timeSeries)
            .slice(0, 30) // Last 30 days
            .reverse()
            .map(([date, values]) => ({
                date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                open: parseFloat(values['1. open']),
                high: parseFloat(values['2. high']),
                low: parseFloat(values['3. low']),
                close: parseFloat(values['4. close']),
                volume: parseInt(values['5. volume']),
            }));
    } catch (error) {
        console.error('Alpha Vantage time series error:', error);
        throw error;
    }
};

/**
 * Search for stocks
 * @param {string} keywords - Search keywords
 */
export const searchStocksAV = async (keywords) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: 'SYMBOL_SEARCH',
                keywords,
                apikey: API_KEY,
            },
        });

        const matches = response.data.bestMatches || [];
        return matches.map((match) => ({
            symbol: match['1. symbol'],
            name: match['2. name'],
            type: match['3. type'],
            region: match['4. region'],
            currency: match['8. currency'],
        }));
    } catch (error) {
        console.error('Alpha Vantage search error:', error);
        throw error;
    }
};

/**
 * Get cryptocurrency exchange rate
 * @param {string} crypto - Crypto symbol (e.g., 'BTC')
 * @param {string} market - Market currency (e.g., 'USD')
 */
export const getCryptoRate = async (crypto, market = 'USD') => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: 'CURRENCY_EXCHANGE_RATE',
                from_currency: crypto,
                to_currency: market,
                apikey: API_KEY,
            },
        });

        const rate = response.data['Realtime Currency Exchange Rate'];
        if (!rate) {
            throw new Error('No crypto data found');
        }

        return {
            from: rate['1. From_Currency Code'],
            to: rate['3. To_Currency Code'],
            rate: parseFloat(rate['5. Exchange Rate']),
            lastUpdated: rate['6. Last Refreshed'],
        };
    } catch (error) {
        console.error('Alpha Vantage crypto error:', error);
        throw error;
    }
};

export default {
    getQuoteAV,
    getDailyTimeSeries,
    searchStocksAV,
    getCryptoRate,
};
