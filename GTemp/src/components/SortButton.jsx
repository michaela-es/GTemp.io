import React from 'react';

const SortButton = ({ 
  label, 
  isActive, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.button,
        ...(isActive ? styles.active : styles.inactive)
      }}
    >
      {label}
    </button>
  );
};

const styles = {
  button: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
  inactive: {
    backgroundColor: '#ffebee', // Light pink/red
    color: '#d32f2f', // Darker red text
    border: '1px solid #ffcdd2',
  },
  active: {
    backgroundColor: '#d32f2f', // Dark red/pink when active
    color: 'white', // White text when active
    border: '1px solid #b71c1c',
  }
};

export default SortButton;