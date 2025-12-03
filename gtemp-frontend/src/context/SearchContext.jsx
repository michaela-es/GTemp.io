import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  const parseArrayFromURL = (paramName) => {
    const param = searchParams.get(paramName);
    return param ? param.split(',').filter(item => item.trim() !== '') : [];
  };
  
  const arrayToString = (array) => {
    return array.length > 0 ? array.join(',') : '';
  };
  
  const initialQuery = searchParams.get('q') || '';
  const initialEngine = parseArrayFromURL('engine');
  const initialType = parseArrayFromURL('type');
  const initialPrice = parseArrayFromURL('price');
  
  const [query, setQuery] = useState(initialQuery);
  const [engine, setEngine] = useState(initialEngine); 
  const [type, setType] = useState(initialType);     
  const [price, setPrice] = useState(initialPrice);   

  useEffect(() => {
    const currentQuery = searchParams.get('q') || '';
    const currentEngine = parseArrayFromURL('engine');
    const currentType = parseArrayFromURL('type');
    const currentPrice = parseArrayFromURL('price');
    
    if (currentQuery !== query) setQuery(currentQuery);
    if (JSON.stringify(currentEngine) !== JSON.stringify(engine)) setEngine(currentEngine);
    if (JSON.stringify(currentType) !== JSON.stringify(type)) setType(currentType);
    if (JSON.stringify(currentPrice) !== JSON.stringify(price)) setPrice(currentPrice);
  }, [searchParams]);

  const updateSearchParams = useCallback((updates) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== '') {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    
    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const setQueryAndUpdateURL = useCallback((newQuery) => {
    setQuery(newQuery);
    updateSearchParams({ q: newQuery });
  }, [updateSearchParams]);

  const setEngineAndUpdateURL = useCallback((newEngine) => {
    setEngine(newEngine);
    updateSearchParams({ engine: arrayToString(newEngine) });
  }, [updateSearchParams]);

  const setTypeAndUpdateURL = useCallback((newType) => {
    setType(newType);
    updateSearchParams({ type: arrayToString(newType) });
  }, [updateSearchParams]);

  const setPriceAndUpdateURL = useCallback((newPrice) => {
    setPrice(newPrice);
    updateSearchParams({ price: arrayToString(newPrice) });
  }, [updateSearchParams]);

  const clearAll = useCallback(() => {
    setQuery('');
    setEngine([]);
    setType([]);
    setPrice([]);
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const toggleEngine = useCallback((engineValue) => {
    setEngine(prev => {
      const newEngine = prev.includes(engineValue)
        ? prev.filter(item => item !== engineValue)
        : [...prev, engineValue];
      updateSearchParams({ engine: arrayToString(newEngine) });
      return newEngine;
    });
  }, [updateSearchParams]);

  const toggleType = useCallback((typeValue) => {
    setType(prev => {
      const newType = prev.includes(typeValue)
        ? prev.filter(item => item !== typeValue)
        : [...prev, typeValue];
      updateSearchParams({ type: arrayToString(newType) });
      return newType;
    });
  }, [updateSearchParams]);

  const togglePrice = useCallback((priceValue) => {
    setPrice(prev => {
      const newPrice = prev.includes(priceValue)
        ? prev.filter(item => item !== priceValue)
        : [...prev, priceValue];
      updateSearchParams({ price: arrayToString(newPrice) });
      return newPrice;
    });
  }, [updateSearchParams]);

  const getFilters = useCallback(() => ({
    engine_type: engine,
    template_type: type,
    price_range: price,
  }), [engine, type, price]);

  const isSearchActive = useCallback(() => {
    return query !== '' || engine.length > 0 || type.length > 0 || price.length > 0;
  }, [query, engine, type, price]);

  const value = {
    query,
    engine,
    type,  
    price,  
    
    setQuery: setQueryAndUpdateURL,
    setEngine: setEngineAndUpdateURL,
    setType: setTypeAndUpdateURL,
    setPrice: setPriceAndUpdateURL,
    
    toggleEngine,
    toggleType,
    togglePrice,
    
    setFilters: (filters) => {
      const updates = {};
      if (filters.query !== undefined) {
        setQuery(filters.query);
        updates.q = filters.query;
      }
      if (filters.engine !== undefined) {
        setEngine(filters.engine);
        updates.engine = arrayToString(filters.engine);
      }
      if (filters.type !== undefined) {
        setType(filters.type);
        updates.type = arrayToString(filters.type);
      }
      if (filters.price !== undefined) {
        setPrice(filters.price);
        updates.price = arrayToString(filters.price);
      }
      updateSearchParams(updates);
    },
    
    clearAll,
    getFilters,
    isSearchActive,
    
    searchParams: Object.fromEntries(searchParams.entries()),
    currentPath: location.pathname,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
};