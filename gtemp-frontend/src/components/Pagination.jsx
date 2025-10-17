import React, { useMemo } from 'react';
import { generatePaginationButtons } from '../utils/pagination';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const paginationButtons = useMemo(() => {
    const buttonConfigs = generatePaginationButtons(totalPages, currentPage, onPageChange);
    
    return buttonConfigs.map(config => {
      if (config.type === 'ellipsis') {
        return (
          <span key={config.key} className="pagination-ellipsis">
            {config.label}
          </span>
        );
      }
      
      return (
        <button
          key={config.key}
          onClick={() => onPageChange(config.page)}
          className={`pagination-btn ${config.active ? 'active' : ''} ${config.type === 'nav' ? 'nav-btn' : ''}`}
        >
          {config.label}
        </button>
      );
    });
  }, [totalPages, currentPage, onPageChange]);

  if (totalPages <= 1) return null;

  return <div className="pagination">{paginationButtons}</div>;
};

export default Pagination;