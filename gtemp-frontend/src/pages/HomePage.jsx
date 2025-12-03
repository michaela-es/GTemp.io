import React, { useState, useCallback, useEffect } from 'react';
import TemplateCard from '../components/Templates/TemplateCard';
import FilterToggle from '../components/Sort/FilterToggle';
import SortButton from '../components/Sort/SortButton';
import Pagination from '../components/Sort/Pagination';
import filterConfig from '../filterConfig.json';
import useLoadData from '../hooks/useLoadData';
import useTemplateManager from '../hooks/useTemplateManager';
import { useSearch } from '../context/SearchContext';
import Header from '../components/display/Header';

export const HomePage = () => {
  const { data, loading } = useLoadData();
  
  const { 
    query, 
    setQuery, 
    engine, 
    setEngine, 
    type, 
    setType, 
    price, 
    setPrice,
    toggleEngine,
    toggleType,
    togglePrice,
    clearAll 
  } = useSearch();

  const [activeSorts, setActiveSorts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const engineArray = Array.isArray(engine) ? engine : (engine ? [engine] : []);
  const typeArray = Array.isArray(type) ? type : (type ? [type] : []);
  const priceArray = Array.isArray(price) ? price : (price ? [price] : []);

  const filters = {
    engine_type: engineArray,
    template_type: typeArray,
    price_range: priceArray
  };

  const { paginatedItems, totalPages } = useTemplateManager(
    data, query, filters, activeSorts, currentPage, 8
  );

  const handleSort = useCallback((sortType) => {
    setActiveSorts(prev => 
      prev.includes(sortType)
        ? prev.filter(s => s !== sortType)
        : [...prev.slice(-2), sortType] 
    );
  }, []);

  const handleEngineChange = (newSelection) => {
    if (toggleEngine) {
      setEngine(newSelection);
    } else {
      setEngine(newSelection.length > 0 ? newSelection.join(',') : '');
    }
  };

  const handleTypeChange = (newSelection) => {
    if (toggleType) {
      setType(newSelection);
    } else {
      setType(newSelection.length > 0 ? newSelection.join(',') : '');
    }
  };

  const handlePriceChange = (newSelection) => {
    if (togglePrice) {
      setPrice(newSelection);
    } else {
      setPrice(newSelection.length > 0 ? newSelection.join(',') : '');
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [query, engine, type, price]);

  if (loading) return <h2>Loading templates...</h2>;

  return (
    <div className="app-container">
      <Header/>
        <div className="home-content">
          <div className="filter-row">
            <FilterToggle
              title="Engine Type"
              options={filterConfig.engine}
              selectedValues={engineArray}
              onSelectionChange={handleEngineChange}
            />

            <FilterToggle
              title="Template Type"
              options={filterConfig.type}
              selectedValues={typeArray}
              onSelectionChange={handleTypeChange}
            />

            <FilterToggle
              title="Price"
              options={filterConfig.price_range}
              selectedValues={priceArray}
              onSelectionChange={handlePriceChange}
            />
          </div>

          {(query || engineArray.length > 0 || typeArray.length > 0 || priceArray.length > 0) && (
            <button 
              onClick={clearAll}
              className="clear-filters-btn"
              style={{
                margin: '10px',
                padding: '8px 16px',
                background: '#f0f0f0',
                border: '1px solid #ccc',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Clear All Filters
            </button>
          )}

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
              label="Price (Lowest)"
              isActive={activeSorts.includes('price')}
              onClick={() => handleSort('price')}
            />
          </div>

          {query && (
            <div className="search-results-info">
              <h3>Search results for: "{query}"</h3>
              <p>Found {paginatedItems.length} templates</p>
            </div>
          )}

          <div className="templates-grid">
            {paginatedItems.length > 0 ? (
              paginatedItems.map((t, index) => (
                <TemplateCard
                  key={t.id ?? index}
                  id={t.id}
                  templateTitle={t.templateTitle}
                  coverImagePath={t.coverImagePath}
                  rating={t.rating}
                  downloads={t.downloads}
                  templateDesc={t.templateDesc}
                />
              ))
            ) : (
              <div className="no-results">
                <p>No templates found matching your filters.</p>
                {(query || engineArray.length > 0 || typeArray.length > 0 || priceArray.length > 0) && (
                  <button 
                    onClick={clearAll}
                    className="clear-search-btn"
                    style={{
                      padding: '8px 16px',
                      background: '#f0f0f0',
                      border: '1px solid #ccc',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      marginTop: '10px'
                    }}
                  >
                    Clear Search & Filters
                  </button>
                )}
              </div>
            )}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
    </div>
  );
};

export default HomePage;