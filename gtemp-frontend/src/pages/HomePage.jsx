import React, { useState, useCallback } from 'react';
import TemplateCard from '../components/Templates/TemplateCard';
import SearchBar from '../components/Search/SearchBar';
import FilterToggle from '../components/Sort/FilterToggle';
import SortButton from '../components/Sort/SortButton';
import Pagination from '../components/Sort/Pagination';
import filterConfig from '../filterConfig.json';
import useLoadData from '../hooks/useLoadData';
import useTemplateManager from '../hooks/useTemplateManager';
import FirstContainer from '../components/display/Header';

export const Home = () => {
  const { data, loading } = useLoadData();

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    engine_type: [],
    template_type: [],
    price_range: []
  });
  const [activeSorts, setActiveSorts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { paginatedItems, totalPages } = useTemplateManager(
    data, query, filters, activeSorts, currentPage, 12
  );

  const handleSort = useCallback((sortType) => {
    setActiveSorts(prev => 
      prev.includes(sortType)
        ? prev.filter(s => s !== sortType)
        : [...prev.slice(-2), sortType] 
    );
  }, []);

  if (loading) return <h2>Loading templates...</h2>;

  return (
    <div className="app-container">
      {/* <FirstContainer /> */}

      <div className="filter-row">
        <FilterToggle
          title="Engine Type"
          options={filterConfig.engine}
          selectedValues={filters.engine_type}
          onSelectionChange={(newSelection) =>
            setFilters(prev => ({ ...prev, engine_type: newSelection }))
          }
        />

        <FilterToggle
          title="Template Type"
          options={filterConfig.type}
          selectedValues={filters.template_type}
          onSelectionChange={(newSelection) =>
            setFilters(prev => ({ ...prev, template_type: newSelection }))
          }
        />

        <FilterToggle
          title="Price"
          options={filterConfig.price_range}
          selectedValues={filters.price_range}
          onSelectionChange={(newSelection) =>
            setFilters(prev => ({ ...prev, price_range: newSelection }))
          }
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
          <p>No templates found matching your filters.</p>
        )}
      </div>


      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;
