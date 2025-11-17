import React, { createContext, useContext, useState, useEffect } from 'react';

const AppDataContext = createContext();

export const AppDataProvider = ({ children, itemsPerPage = 10 }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    engine_type: [],
    template_type: [],
    price_range: []
  });
  const [activeSorts, setActiveSorts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, activeSorts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error('Failed to fetch templates:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <AppDataContext.Provider value={{
      data,
      loading,
      filters,
      setFilters,
      activeSorts,
      setActiveSorts,
      currentPage,
      setCurrentPage,
      itemsPerPage
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => useContext(AppDataContext);
