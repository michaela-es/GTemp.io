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

  const sortedAndFilteredData = useMemo(() => {
    const filtered = data.filter(template => {
      const matchesSearch = template.templateName.toLowerCase().includes(query.toLowerCase());

      const matchesEngine = filters.engine_type.length === 0 || 
        filters.engine_type.includes(template.engine_type);
      
      const matchesType = filters.template_type.length === 0 || 
        filters.template_type.includes(template.template_type);
      
      const matchesPrice = filters.price_range.length === 0 || 
        (filters.price_range.includes('Free') && template.price === 0) ||
        (filters.price_range.includes('Paid') && template.price > 0);
      
      return matchesSearch && matchesEngine && matchesType && matchesPrice;
    });

    if (activeSorts.length === 0) return filtered;

    return [...filtered].sort((a, b) => {
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
        {sortedAndFilteredData.length > 0 ? (
          sortedAndFilteredData.map((template, index) => (
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
              : 'No templates available'
            }
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
