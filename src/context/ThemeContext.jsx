import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export function ThemeProvider({ children }) {
    // Check localStorage or system preference for initial theme
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('stocksphere-theme');
        if (saved) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        // Apply theme class to document
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('stocksphere-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('stocksphere-theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
