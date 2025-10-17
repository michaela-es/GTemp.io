
export const paginate = (items, currentPage, itemsPerPage) => {
  if (!Array.isArray(items)) {
    return [];
  }
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
};

export default paginate;