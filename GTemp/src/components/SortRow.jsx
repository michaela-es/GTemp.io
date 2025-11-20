import React, { useCallback } from 'react';
import SortButton from '../components/SortButton';

const SortRow = ({ activeSorts = [], setActiveSorts }) => {
  const handleSort = useCallback((sortType) => {
    setActiveSorts(prev =>
      prev.includes(sortType)
        ? prev.filter(s => s !== sortType)
        : prev.length >= 3
          ? [...prev.slice(1), sortType]
          : [...prev, sortType]
    );
  }, [setActiveSorts]);

  return (
    <div className="sort-row" style={{ display: 'flex', gap: '.3em', alignItems: 'center', margin: '1em'}}>
      <SortButton
        label="Popular"
        isActive={activeSorts.includes('popular')}
        onClick={() => handleSort('popular')}
      />

      <SortButton
        label="Recently Published"
        isActive={activeSorts.includes('recent')}
        onClick={() => handleSort('recent')}
      />

      <SortButton
        label="Top Rated"
        isActive={activeSorts.includes('rating')}
        onClick={() => handleSort('rating')}
      />
      
      <SortButton
        label="Price"
        isActive={activeSorts.includes('price')}
        onClick={() => handleSort('price')}
      />
    </div>
  );
};

SortRow.defaultProps = {
  activeSorts: []
};

export default SortRow;
