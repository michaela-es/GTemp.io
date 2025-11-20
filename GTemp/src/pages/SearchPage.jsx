import React, { useState, useCallback } from 'react';
import { useTemplates } from '../contexts/TemplatesContext';
import { useSearchTemplates } from '../utils/useSearchTemplates';
import TemplateGrid from '../components/TemplateGrid';
import HeaderBar from '../components/HeaderBar';
import Pagination from '../components/Pagination';

const SearchPage = () => {
  const { templates, loading } = useTemplates();
  const results = useSearchTemplates(templates || []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; 

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const paginatedItems = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!templates || templates.length === 0) return <div>No templates found.</div>;

  return (
    <div className="app-container">
      <HeaderBar />
      <TemplateGrid templates={paginatedItems} query={results.length ? results[0].query : ''} />
      {totalPages > 1 && (
        <div className="pagination-container">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
