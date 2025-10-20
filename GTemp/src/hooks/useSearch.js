// hooks/useSearch.js
import { useState, useCallback } from 'react';

export const useSearch = () => {
  const [query, setQuery] = useState('');

  const updateQuery = useCallback((newQuery) => {
    setQuery(newQuery);
  }, []);

  const clearQuery = useCallback(() => {
    setQuery('');
  }, []);

  return {
    query,
    setQuery: updateQuery,
    clearQuery
  };
};