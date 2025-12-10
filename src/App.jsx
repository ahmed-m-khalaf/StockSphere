import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home/Home';
import StockDetails from './pages/StockDetails/StockDetails';
import Watchlist from './pages/Watchlist/Watchlist';
import News from './pages/News/News';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { WatchlistProvider } from './context/WatchlistContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <WatchlistProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="stock/:symbol" element={<StockDetails />} />
              <Route path="watchlist" element={<Watchlist />} />
              <Route path="news" element={<News />} />
            </Route>
            {/* Auth routes without MainLayout */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </WatchlistProvider>
    </ThemeProvider>
  );
}

export default App;
