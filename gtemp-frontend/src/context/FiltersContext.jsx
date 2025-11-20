import { createContext, useContext, useState } from 'react';

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    engine_type: [],
    template_type: [],
    price_range: [],
  });
  const [activeSorts, setActiveSorts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  return (
    <FiltersContext.Provider value={{
      filters, setFilters,
      activeSorts, setActiveSorts,
      currentPage, setCurrentPage,
      itemsPerPage
    }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);
