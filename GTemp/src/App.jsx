import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import WishlistPage from './pages/WishlistPage';
import TemplateDetail from './pages/TemplateDetail';
import { SearchProvider } from './contexts/SearchContext';
import { TemplatesProvider } from './contexts/TemplatesContext';
import { AppDataProvider } from './contexts/AppDataContext';
import { AuthProvider } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { CommentsProvider } from './contexts/CommentsContext';
import { FiltersProvider } from './contexts/FiltersContext'; 
import { PaginationProvider } from './contexts/PaginationContext';
import SortButton from './components/SortButton';
import { SortProvider } from './contexts/SortContext';
const App = () => {
  return (
    <AuthProvider>
      <AppDataProvider>
        <WishlistProvider>
          <SortProvider>
          <FiltersProvider> 
            <TemplatesProvider>
              <SearchProvider>
                <PaginationProvider>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route
                      path="/template/:templateID"
                      element={
                        <CommentsProvider>
                          <TemplateDetail />
                        </CommentsProvider>
                      }
                    />
                  </Routes>
                </PaginationProvider>
              </SearchProvider>
            </TemplatesProvider>
          </FiltersProvider>
          </SortProvider>
        </WishlistProvider>
      </AppDataProvider>
    </AuthProvider>
  );
};

export default App;
