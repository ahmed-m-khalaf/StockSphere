/**
 * StockPulse Dashboard - Stock API Service
 * Uses Finnhub API for real-time stock market data
 */

import axios from 'axios';

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

const stockApi = axios.create({
    baseURL: BASE_URL,
    params: {
        token: API_KEY,
    },
});

/**
 * Search for stocks by symbol or company name
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Array of matching stocks
 */
export const searchStocks = async (query) => {
    try {
        const response = await stockApi.get('/search', {
            params: { q: query },
        });
        return response.data.result || [];
    } catch (error) {
        console.error('Error searching stocks:', error);
        throw error;
    }
};

/**
 * Get real-time quote for a stock
 * @param {string} symbol - Stock symbol (e.g., 'AAPL')
 * @returns {Promise<Object>} - Quote data
 */
export const getQuote = async (symbol) => {
    try {
        const response = await stockApi.get('/quote', {
            params: { symbol },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching quote:', error);
        throw error;
    }
};

/**
 * Get company profile
 * @param {string} symbol - Stock symbol
 * @returns {Promise<Object>} - Company profile data
 */
export const getCompanyProfile = async (symbol) => {
    try {
        const response = await stockApi.get('/stock/profile2', {
            params: { symbol },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching company profile:', error);
        throw error;
    }
};

/**
 * Get historical candle data
 * @param {string} symbol - Stock symbol
 * @param {string} resolution - D (Daily), W (Weekly), M (Monthly)
 * @param {number} from - Unix timestamp start
 * @param {number} to - Unix timestamp end
 * @returns {Promise<Object>} - Candle data
 */
export const getCandles = async (symbol, resolution = 'D', from, to) => {
    try {
        const response = await stockApi.get('/stock/candle', {
            params: { symbol, resolution, from, to },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching candles:', error);
        throw error;
    }
};

/**
 * Get market news
 * @param {string} category - News category (general, forex, crypto, merger)
 * @returns {Promise<Array>} - Array of news articles
 */
export const getMarketNews = async (category = 'general') => {
    try {
        const response = await stockApi.get('/news', {
            params: { category },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};

export default stockApi;
