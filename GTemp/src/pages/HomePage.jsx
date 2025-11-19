import React, { useCallback } from 'react';
import TemplateCard from '../components/TemplateCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import filterConfig from '../filterConfig.json';
import useTemplateManager from '../hooks/useTemplateManager';
import FilterRow from '../components/FilterRow';
import SortRow from '../components/SortRow';
import TemplateGrid from '../components/TemplateGrid';
import { useSearch } from '../contexts/SearchContext';import useFiltersAndPagination from '../hooks/useFiltersAndPagination';
import { useTemplates } from '../contexts/TemplatesContext'; 
import '../App.css';
import HeaderBar from '../components/HeaderBar';
const HomePage = () => {
  const { templates, loading } = useTemplates();

  const {
    filters,
    setFilters,
    activeSorts,
    setActiveSorts,
    currentPage,
    setCurrentPage,
    itemsPerPage
  } = useFiltersAndPagination();

  const { query, setQuery } = useSearch();
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
        <FilterRow
          filters={filters}
          setFilters={setFilters}
          filterConfig={filterConfig}
        />

        <SortRow
          activeSorts={activeSorts}
          setActiveSorts={setActiveSorts}
        />
      </div>

      <TemplateGrid 
        templates={currentItems} 
        query={query} 
        filters={filters} 
      />

      <div className="pagination-container">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default HomePage;
