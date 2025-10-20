import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
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
        setLoading(true);
        const allTemplates = await storageService.getAllTemplates();
        setData(allTemplates);
      } catch (err) {
        console.error('Failed to fetch templates:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const refreshData = async () => {
    try {
      const allTemplates = await storageService.getAllTemplates();
      setData(allTemplates);
    } catch (err) {
      console.error('Failed to refresh templates:', err);
    }
  };

  const addTemplate = async (templateData) => {
    try {
      const newTemplate = await storageService.addTemplate(templateData);
      await refreshData();
      return newTemplate;
    } catch (err) {
      console.error('Failed to add template:', err);
      throw err;
    }
  };

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
      itemsPerPage,
      refreshData, 
      addTemplate  
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => useContext(AppDataContext);