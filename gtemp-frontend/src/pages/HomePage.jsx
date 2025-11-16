import React, { useCallback } from 'react';
import TemplateCard from '../components/TemplateCard';
import SearchBar from '../components/SearchBar';
import FilterToggle from '../components/FilterToggle';
import SortButton from '../components/SortButton';
import Pagination from '../components/Pagination';
import filterConfig from '../filterConfig.json'
import useTemplateManager from '../hooks/useTemplateManager';

const HomePage = ({ 
  data, 
  query, 
  setQuery, 
  filters, 
  setFilters, 
  activeSorts, 
  setActiveSorts, 
  currentPage, 
  setCurrentPage, 
  itemsPerPage = 10 
}) => {
  const { paginatedItems: currentItems, totalPages } = useTemplateManager(
    data, query, filters, activeSorts, currentPage, itemsPerPage
  );

  const handleSort = useCallback((sortType) => {
    setActiveSorts(prev => prev.includes(sortType) 
      ? prev.filter(s => s !== sortType)
      : prev.length >= 3 
        ? [...prev.slice(1), sortType]
        : [...prev, sortType]
    );
  }, [setActiveSorts]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  return (
    <div className="app-container">
      <SearchBar query={query} setQuery={setQuery} />

      <div className="filter-row">
        <FilterToggle
          title="Engine Type"
          options={filterConfig.engine}
          selectedValues={filters.engine}
          onSelectionChange={(newSelection) => setFilters(prev => ({ ...prev, engine_type: newSelection }))}
        />
        <FilterToggle
          title="Template Type"
          options={filterConfig.sortType}
          selectedValues={filters.type}
          onSelectionChange={(newSelection) => setFilters(prev => ({ ...prev, template_type: newSelection }))}
        />
        <FilterToggle
          title="Price"
          options={filterConfig.price_range}
          selectedValues={filters.price_range}
          onSelectionChange={(newSelection) => setFilters(prev => ({ ...prev, price_range: newSelection }))}
        />
      </div>

      <div className="sort-row">
        <SortButton
          label="Popular"
          isActive={activeSorts.includes('popular')}
          onClick={() => handleSort('popular')}
        />
        <SortButton
          label="Rating"
          isActive={activeSorts.includes('rating')}
          onClick={() => handleSort('rating')}
        />
        <SortButton
          label="Price"
          isActive={activeSorts.includes('price')}
          onClick={() => handleSort('price')}
        />
      </div>

      <div className="templates-grid">
        {currentItems.length > 0 ? (
          currentItems.map((template, index) => (
            <TemplateCard
              key={index}
              templateID={template.templateID} 
              templateName={template.templateName}
              templateImg={template.templateImg}
              templateRating={template.templateRating}
              templateDls={template.templateDls}
              templateDesc={template.templateDesc}
            />
          ))
        ) : (
          <p className="no-results">
            {query || Object.values(filters).some(arr => arr.length > 0)
              ? 'No templates found matching your criteria'
              : 'No templates available'}
          </p>
        )}
      </div>

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