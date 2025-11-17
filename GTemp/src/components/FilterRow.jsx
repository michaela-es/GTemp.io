import React from 'react';
import FilterToggle from '../components/FilterToggle';

const FilterRow = ({ filters, setFilters, filterConfig }) => {
  return (
    <div className="filter-row" style={{ display: 'flex', gap: '.3em', alignItems: 'center', margin: '1em'}}>
      <FilterToggle
        title="Engine Type"
        options={filterConfig.engine_type}
        selectedValues={filters.engine_type}
        onSelectionChange={(newSelection) =>
          setFilters(prev => ({ ...prev, engine_type: newSelection }))
        }
      />
      <FilterToggle
        title="Template Type"
        options={filterConfig.template_type}
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
  );
};

export default FilterRow;
