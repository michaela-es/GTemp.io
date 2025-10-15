import React from 'react';
import { useSearch } from '../contexts/SearchContext';
import { useTemplates } from '../contexts/TemplatesContext';
import { searchTemplates } from '../utils/searchTemplates';
import TemplateGrid from '../components/TemplateGrid';
import HeaderBar from '../components/HeaderBar';
const SearchPage = () => {
  const { query } = useSearch();
  const { templates, loading } = useTemplates();

  if (loading) return <div>Loading...</div>;
  if (!templates) return <div>No templates found.</div>;

  const results = searchTemplates(templates, query);

  return (
    
    <div className="app-container">
      <HeaderBar />
      <TemplateGrid templates={results} query={query} />
    </div>
  );
};

export default SearchPage;
