import { useState, useContext } from 'react';
import React from 'react';
const PaginationContext = React.createContext();

export const usePagination = () => {
  return useContext(PaginationContext);
};

export const PaginationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 
  return (
    <PaginationContext.Provider value={{ currentPage, setCurrentPage, itemsPerPage }}>
      {children}
    </PaginationContext.Provider>
  );
};
