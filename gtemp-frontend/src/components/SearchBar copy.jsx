import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearch } from '../contexts/SearchContext';
const SearchBar = () => {
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (location.pathname !== '/') {
        navigate('/search');
      } else {
      }
    }
  };

  return (
    <>
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Search templates..."
      className="search-input"
    />

    </>
  );
};
export default SearchBar;
