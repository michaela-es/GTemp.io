import React, { useCallback } from 'react';
import TemplateCard from '../components/TemplateCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import FilterRow from '../components/FilterRow';
import SortRow from '../components/SortRow';
import TemplateGrid from '../components/TemplateGrid';
import HeaderBar from '../components/HeaderBar';
import { useFilters } from '../contexts/FiltersContext';
import { usePagination } from '../contexts/PaginationContext';
import { useTemplates } from '../contexts/TemplatesContext';
import { useSearch } from '../contexts/SearchContext';
import { useSort } from '../contexts/SortContext'; 
import useTemplateManager from '../hooks/useTemplateManager';

import '../App.css';

const HomePage = () => {
  const { templates, loading } = useTemplates();
  const { filters, setFilters } = useFilters();
  const { currentPage, setCurrentPage, itemsPerPage } = usePagination();
  const { query } = useSearch();
  const { activeSorts, setActiveSorts } = useSort(); 

  const { paginatedItems: currentItems, totalPages } = useTemplateManager(
    templates || [],
    query,
    filters,
    activeSorts,  
    currentPage,
    itemsPerPage
  );

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  if (loading) {
    return <div>Loading templates...</div>;
  }

  if (!templates || templates.length === 0) {
    return <div>No templates available.</div>;
  }

  return (
    <div className="app-container">
      <HeaderBar />

      <div className="filters-sort-container">
        <FilterRow filters={filters} setFilters={setFilters} />
        <SortRow setActiveSorts={setActiveSorts} />  
      </div>

      <TemplateGrid templates={currentItems} query={query} filters={filters} />

      <div className="pagination-container">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default HomePage;
