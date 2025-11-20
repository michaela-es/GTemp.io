import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearch } from '../contexts/SearchContext';

const SearchBar = ({ debounceMs = 300 }) => {
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setLocalQuery(params.get('q') || '');
  }, [location.search]);

  useEffect(() => {
    const handler = setTimeout(() => setQuery(localQuery), debounceMs);
    return () => clearTimeout(handler);
  }, [localQuery, setQuery, debounceMs]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${encodeURIComponent(localQuery)}`);
    }
  };

  return (
    <input
      type="text"
      value={localQuery}
      onChange={(e) => setLocalQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Search templates..."
      className="search-input"
    />
  );
};

export default SearchBar;
