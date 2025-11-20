import { useMemo } from 'react';
import { useFilters } from '../contexts/FiltersContext';
import { useSearch } from '../contexts/SearchContext';
import { useSort } from '../contexts/SortContext';
import { usePagination } from '../contexts/PaginationContext';
import { searchTemplates } from '../utils/useSearchTemplates';
import { filterTemplates } from '../utils/filterTemplates';
import { sortTemplates } from '../utils/sortTemplates';
import { paginate } from '../utils/paginate';

const useTemplateManager = (data) => {
  // Fetch the context values directly inside the hook
  const { filters } = useFilters();            // Filter values
  const { query } = useSearch();               // Search query
  const { activeSorts } = useSort();           // Active sorting options
  const { currentPage, itemsPerPage } = usePagination(); // Pagination state

  return useMemo(() => {
    // If the data is not an array, return empty values
    if (!Array.isArray(data)) {
      return {
        paginatedItems: [],
        totalPages: 0,
        totalItems: 0,
      };
    }

    // Apply search filter
    const searched = searchTemplates(data, query);

    // Apply additional filters (e.g., engine_type, template_type, etc.)
    const filtered = filterTemplates(searched, filters);

    // Apply sorting (e.g., by rating, popularity)
    const sorted = sortTemplates(filtered, activeSorts);

    // Calculate total items and total pages
    const totalItems = sorted.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Apply pagination logic based on current page and items per page
    const paginatedItems = paginate(sorted, currentPage, itemsPerPage);

    // Return the necessary data
    return {
      paginatedItems,
      totalPages,
      totalItems,
    };
  }, [data, query, filters, activeSorts, currentPage, itemsPerPage]); // Re-run when any of these values change
};

export default useTemplateManager;
