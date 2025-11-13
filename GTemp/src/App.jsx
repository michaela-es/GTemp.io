import React from 'react';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import WishlistPage from './pages/WishlistPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TemplateDetail from './pages/TemplateDetail';
import { SearchProvider } from './contexts/SearchContext';
import { TemplatesProvider } from './contexts/TemplatesContext';
import { AppDataProvider } from './contexts/AppDataContext';
import { AuthProvider } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';
const App = () => {
  return (
      <AuthProvider> 
        <AppDataProvider>
          <WishlistProvider>
          <TemplatesProvider>
            <SearchProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/template/:templateID" element={<TemplateDetail />} />
              </Routes>
            </SearchProvider>
          </TemplatesProvider>
          </WishlistProvider>
        </AppDataProvider>
      </AuthProvider>
  );
};

export default App;