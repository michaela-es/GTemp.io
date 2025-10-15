import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';          // renamed MainPage to HomePage
import SearchPage from './pages/SearchPage';
import TemplateDetail from './pages/TemplateDetail';
import { SearchProvider } from './contexts/SearchContext';
import { TemplatesProvider } from './contexts/TemplatesContext';  // fixed typo: TemplateProvider → TemplatesProvider
import { AppDataProvider } from './contexts/AppDataContext';

const App = () => {
  return (
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
  );
};

export default App;
