import React from 'react';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TemplateDetail from './pages/TemplateDetail';
import { SearchProvider } from './contexts/SearchContext';
import { TemplatesProvider } from './contexts/TemplatesContext';
import { AppDataProvider } from './contexts/AppDataContext';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
      <AuthProvider> 
        <AppDataProvider>
          <TemplatesProvider>
            <SearchProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/template/:templateID" element={<TemplateDetail />} />
              </Routes>
            </SearchProvider>
          </TemplatesProvider>
        </AppDataProvider>
      </AuthProvider>
  );
};

export default App;