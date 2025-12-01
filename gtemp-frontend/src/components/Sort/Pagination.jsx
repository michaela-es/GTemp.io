import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  const generatePaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          style={{
            margin: '0 4px',
            padding: '6px 12px',
            backgroundColor: i === currentPage ? '#007bff' : '#fff',
            color: i === currentPage ? '#fff' : '#333',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return <div style={{ marginTop: '20px' }}>{generatePaginationButtons()}</div>;
};

export default Pagination;
