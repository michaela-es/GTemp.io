import { useMemo } from 'react';
import { filterTemplates } from '../utils/filterTemplates';
import { sortTemplates } from '../utils/sortTemplates';
import { paginate } from '../utils/paginate';

const useTemplateManager = (data, query, filters, activeSorts, currentPage, itemsPerPage) => {
  return useMemo(() => {
    if (!Array.isArray(data)) {
      return {
        paginatedItems: [],
        totalPages: 0,
        totalItems: 0
      };
    }

    const filtered = filterTemplates(data, query, filters);
    const sorted = sortTemplates(filtered, activeSorts);
    const totalItems = sorted.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedItems = paginate(sorted, currentPage, itemsPerPage);

    return {
      paginatedItems,
      totalPages,
      totalItems
    };
  }, [data, query, filters, activeSorts, currentPage, itemsPerPage]);
};

export default useTemplateManager;