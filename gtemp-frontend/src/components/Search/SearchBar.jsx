import React, { useState, useEffect } from 'react';
import { useSearch } from '../../context/SearchContext';
import './SearchBar.css';

const SearchBar = ({ className = '', placeholder = 'Search templates...' }) => {
  const { query, setQuery, clearSearch } = useSearch();
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(localQuery.trim());
  };

  const handleClear = () => {
    setLocalQuery('');
    clearSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`search-bar ${className}`}
      role="search"
    >
      <div className="search-bar-container">
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="search-input"
          aria-label="Search templates"
        />
        
        <div className="search-controls">
          {localQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="search-clear-btn"
              aria-label="Clear search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
          
          <button
            type="submit"
            className="search-submit-btn"
            aria-label="Search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;