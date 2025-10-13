
export const generatePaginationButtons = (totalPages, currentPage, onPageChange) => {
  const buttons = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (currentPage > 1) {
    buttons.push({
      key: 'prev',
      label: '← Previous',
      page: currentPage - 1,
      type: 'nav'
    });
  }

  if (startPage > 1) {
    buttons.push({ key: 1, label: '1', page: 1, type: 'page' });
    if (startPage > 2) {
      buttons.push({ key: 'ellipsis1', label: '...', type: 'ellipsis' });
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    buttons.push({
      key: i,
      label: i.toString(),
      page: i,
      type: 'page',
      active: currentPage === i
    });
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      buttons.push({ key: 'ellipsis2', label: '...', type: 'ellipsis' });
    }
    buttons.push({
      key: totalPages,
      label: totalPages.toString(),
      page: totalPages,
      type: 'page'
    });
  }

  if (currentPage < totalPages) {
    buttons.push({
      key: 'next',
      label: 'Next →',
      page: currentPage + 1,
      type: 'nav'
    });
  }

  return buttons;
};