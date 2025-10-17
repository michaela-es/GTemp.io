import React, { useState } from 'react';

const FilterToggle = ({ 
  title, 
  options, 
  selectedValues, 
  onSelectionChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (value) => {
    const newSelection = selectedValues.includes(value)
      ? selectedValues.filter(item => item !== value)
      : [...selectedValues, value];
    
    onSelectionChange(newSelection);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div style={styles.container}>
      <button 
        onClick={toggleMenu}
        style={styles.toggleButton}
      >
        {title}
        <span style={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div style={styles.menu}>
          {options.map((option) => (
            <label key={option} style={styles.option}>
              <input
                type="checkbox"
                checked={selectedValues.includes(option)}
                onChange={() => handleToggle(option)}
                style={styles.checkbox}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    display: 'inline-block',
  },
  toggleButton: {
    padding: '10px 16px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minWidth: '120px',
    justifyContent: 'space-between',
  },
  arrow: {
    fontSize: '12px',
    color: '#666',
  },
  menu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '6px',
    padding: '8px',
    marginTop: '4px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    zIndex: 1000,
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 8px',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  },
  checkbox: {
    margin: 0,
  },
};

export default FilterToggle;