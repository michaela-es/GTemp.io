import React, { useState } from 'react';
import './FilterToggle.css';

const FilterToggle = ({ title, options, selectedValues, onSelectionChange }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = (value) => {
    const newSelection = selectedValues.includes(value)
      ? selectedValues.filter(item => item !== value)
      : [...selectedValues, value];

    onSelectionChange(newSelection);
  };

  return (
    <div className="filter-dropdown">
      <div 
        className="filter-dropdown-header"
        onClick={() => setOpen(!open)}
      >
        {title}
        <span className={`arrow ${open ? 'open' : ''}`}>▼</span>
      </div>

      {open && (
        <div className="filter-dropdown-content">
          <div className="pill-list">
            {options.map((opt) => (
              <button
                key={opt}
                className={`pill-item ${selectedValues.includes(opt) ? 'selected' : ''}`}
                onClick={() => handleToggle(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterToggle;
