export const filterTemplates = (data, query, filters) => {
  return data.filter(template => {
    const matchesSearch = template.templateName.toLowerCase().includes(query.toLowerCase());

    const matchesEngine = filters.engine_type.length === 0 || 
                         filters.engine_type.includes(template.engine_type);

    const matchesType = filters.template_type.length === 0 || 
                       filters.template_type.includes(template.template_type);

    const matchesPrice = filters.price_range.length === 0 || 
                        (filters.price_range.includes('Free') && template.price === 0) ||
                        (filters.price_range.includes('Paid') && template.price > 0);

    return matchesSearch && matchesEngine && matchesType && matchesPrice;
  });
};
