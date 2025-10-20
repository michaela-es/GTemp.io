import React from 'react';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TemplateDetail from './pages/TemplateDetail';
import { SearchProvider } from './contexts/SearchContext';
import { TemplatesProvider } from './contexts/TemplatesContext';
import { AppDataProvider } from './contexts/AppDataContext';
import { AuthProvider } from './contexts/AuthContext';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';


const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider> 
        <AppDataProvider>
          <TemplatesProvider>
            <SearchProvider>
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/template/:templateID" element={<TemplateDetail />} />
              </Routes>
            </SearchProvider>
          </TemplatesProvider>
        </AppDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;