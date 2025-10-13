import React, { useState, useEffect, useCallback } from 'react';
import TemplateCard from './components/TemplateCard';
import SearchBar from './components/SearchBar';
import FilterToggle from './components/FilterToggle';
import SortButton from './components/SortButton';
import Pagination from './components/Pagination';
import filterConfig from './filterConfig.json';
import './App.css';
import useTemplateManager from './hooks/useTemplateManager';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    engine_type: [],
    template_type: [],
    price_range: []
  });
  const [activeSorts, setActiveSorts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadData = async () => {
      try {
        const dataResponse = await fetch('/data.json');
        const templatesData = await dataResponse.json();
        setData(templatesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, filters, activeSorts]);

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
  }, []);

  const handlePageChange = useCallback(setCurrentPage, []);

  if (loading) return <div>Loading templates...</div>;

  return (
    <div className="app-container">
      <SearchBar query={query} setQuery={setQuery} />

      <div className="filter-row">
        <FilterToggle
          title="Engine Type"
          options={filterConfig.engine_type}
          selectedValues={filters.engine_type}
          onSelectionChange={(newSelection) => setFilters(prev => ({ ...prev, engine_type: newSelection }))}
        />
        <FilterToggle
          title="Template Type"
          options={filterConfig.template_type}
          selectedValues={filters.template_type}
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

export default App;