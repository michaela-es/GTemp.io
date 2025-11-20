export const filterTemplates = (data, filters) => {
  return data.filter(template => {
    // Engine filter
    const matchesEngine =
      !filters.engine_type?.length || filters.engine_type.includes(template.engine_type);

    // Template type filter
    const matchesType =
      !filters.template_type?.length || filters.template_type.includes(template.template_type);

    // Price filter
    let matchesPrice = true;  // By default, allow all prices if no price filter is applied.

    if (filters.price_range?.length) {
      // If "Free" is selected, only templates with price 0 should match
      if (filters.price_range.includes('Free') && template.price === 0) {
        matchesPrice = true;
      }
      // If "Paid" is selected, only templates with price > 0 should match
      else if (filters.price_range.includes('Paid') && template.price > 0) {
        matchesPrice = true;
      }
      // If neither "Free" nor "Paid" match, set matchesPrice to false
      else {
        matchesPrice = false;
      }
    }

    // Return templates that match engine, type, and price filters
    return matchesEngine && matchesType && matchesPrice;
  });
};
