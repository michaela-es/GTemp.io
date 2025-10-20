import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTemplates } from '../contexts/TemplatesContext';
import { searchTemplates } from '../utils/searchTemplates';
import TemplateGrid from '../components/TemplateGrid';
import HeaderBar from '../components/HeaderBar';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { templates, loading } = useTemplates();

  if (loading) return <div>Loading...</div>;
  if (!templates) return <div>No templates found.</div>;

  const results = searchTemplates(templates, query);

  return (
    <div className="app-container">
      <HeaderBar />
      <h1>Search Results for: "{query}"</h1>
      <TemplateGrid templates={results} query={query} />
    </div>
  );
};

export default SearchPage;