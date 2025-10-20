import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppProvider';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import TemplateDetail from './pages/TemplateDetail';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import WishlistContainer from './components/wishlist/WishListContainer';
const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/wishlist" element={<WishlistContainer />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/template/:templateID" element={<TemplateDetail />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;