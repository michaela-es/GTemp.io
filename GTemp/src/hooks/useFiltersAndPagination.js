import { useState, useEffect } from 'react';

const useFiltersAndPagination = (initialFilters = {
  engine_type: [],
  template_type: [],
  price_range: []
}, itemsPerPage = 10) => {
  const [filters, setFilters] = useState(initialFilters);
  const [activeSorts, setActiveSorts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, activeSorts]);

  return {
    filters,
    setFilters,
    activeSorts,
    setActiveSorts,
    currentPage,
    setCurrentPage,
    itemsPerPage
  };
};

export default useFiltersAndPagination;
