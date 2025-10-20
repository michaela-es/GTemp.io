import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery(''); 
    }
  };

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Search templates..."
      className="search-input"
    />
  );
};
export default SearchBar;