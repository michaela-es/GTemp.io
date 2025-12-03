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

    // 1. Apply filterTemplates (engine, type, price)
    let filtered = filterTemplates(data, filters);
    
    // 2. Apply text search
    if (query && query.trim() !== '') {
      const searchTerm = query.toLowerCase().trim();
      filtered = filtered.filter(template => {
        const title = template.templateTitle?.toLowerCase() || '';
        const desc = template.templateDesc?.toLowerCase() || '';

        return title.includes(searchTerm) || 
               desc.includes(searchTerm);
      });
    }

    // 3. Apply sorting
    const sorted = sortTemplates(filtered, activeSorts); 
    
    // 4. Pagination
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