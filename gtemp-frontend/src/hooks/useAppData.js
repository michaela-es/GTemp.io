import useLoadData from './useLoadData';
import useFiltersAndPagination from './useFiltersAndPagination';

const useAppData = (itemsPerPage = 10) => {
  const { data, loading } = useLoadData();
  const filtersState = useFiltersAndPagination(undefined, itemsPerPage);

  return {
    data,
    loading,
    ...filtersState,
  };
};

export default useAppData;
