// components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search templates..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="search-input" // Using CSS class instead of inline styles
    />
  );
};

export default SearchBar;