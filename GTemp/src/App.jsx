import React, { useState, useEffect, useMemo } from 'react';
import TemplateCard from './components/TemplateCard';
import SearchBar from './components/SearchBar';
import FilterToggle from './components/FilterToggle';
import SortButton from './components/SortButton';
import filterConfig from './filterConfig.json';
import './App.css';

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
        setLoading(true);
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

  // Reset to page 1 when filters, search, or sorts change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, filters, activeSorts]);

  // Optimized: Use useMemo to prevent unnecessary re-sorting
  const sortedAndFilteredData = useMemo(() => {
    // First, filter the data
    const filtered = data.filter(template => {
      // Text search
      const matchesSearch = template.templateName.toLowerCase().includes(query.toLowerCase());
      
      // Filter logic
      const matchesEngine = filters.engine_type.length === 0 || 
                           filters.engine_type.includes(template.engine_type);
      
      const matchesType = filters.template_type.length === 0 || 
                         filters.template_type.includes(template.template_type);
      
      const matchesPrice = filters.price_range.length === 0 || 
                          (filters.price_range.includes('Free') && template.price === 0) ||
                          (filters.price_range.includes('Paid') && template.price > 0);
      
      return matchesSearch && matchesEngine && matchesType && matchesPrice;
    });

    // If no sorts active, return filtered data as-is
    if (activeSorts.length === 0) return filtered;

    // Create a copy before sorting to avoid mutating original
    return [...filtered].sort((a, b) => {
      // Apply multiple sorts in order of priority
      for (const sort of activeSorts) {
        let result = 0;
        switch (sort) {
          case 'popular':
            result = b.templateDls - a.templateDls;
            break;
          case 'rating':
            result = b.templateRating - a.templateRating;
            break;
          case 'price':
            result = a.price - b.price;
            break;
          default:
            result = 0;
        }
        if (result !== 0) return result;
      }
      return 0;
    });
  }, [data, query, filters, activeSorts]);

  // Pagination calculations
  const totalItems = sortedAndFilteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedAndFilteredData.slice(startIndex, endIndex);

  const handleSort = (sortType) => {
    setActiveSorts(prev => {
      if (prev.includes(sortType)) {
        return prev.filter(s => s !== sortType);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), sortType];
      }
      return [...prev, sortType];
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="pagination-btn"
        >
          ← Previous
        </button>
      );
    }

    // First page and ellipsis
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="pagination-btn"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    // Last page and ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="pagination-btn"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="pagination-btn"
        >
          Next →
        </button>
      );
    }

    return buttons;
  };

  if (loading) return <div>Loading templates...</div>;

  return (
    <div className="app-container">      
      <SearchBar query={query} setQuery={setQuery} />
      
      <div className="filter-row">
        <FilterToggle
          title="Engine Type"
          options={filterConfig.engine_type || []}
          selectedValues={filters.engine_type}
          onSelectionChange={(newSelection) => 
            setFilters(prev => ({ ...prev, engine_type: newSelection }))
          }
        />
        
        <FilterToggle
          title="Template Type"
          options={filterConfig.template_type || []}
          selectedValues={filters.template_type}
          onSelectionChange={(newSelection) => 
            setFilters(prev => ({ ...prev, template_type: newSelection }))
          }
        />
        
        <FilterToggle
          title="Price"
          options={filterConfig.price_range || []}
          selectedValues={filters.price_range}
          onSelectionChange={(newSelection) => 
            setFilters(prev => ({ ...prev, price_range: newSelection }))
          }
        />
      </div>

      {/* Sort Buttons Row */}
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
              key={startIndex + index}
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
              : 'No templates available'
            }
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          {renderPaginationButtons()}
        </div>
      )}
    </div>
  );
};

export default App;