export const filterTemplates = (data, filters) => {
  return data.filter(template => {
    const engineValue = template.engine;
    
    const matchesEngine = filters.engine_type.length === 0 || 
                         (engineValue && filters.engine_type.includes(engineValue));

    const matchesType = filters.template_type.length === 0 || 
                       (template.type && filters.template_type.includes(template.type));

    const matchesPrice = filters.price_range.length === 0 || 
                        (filters.price_range.includes('Free') && template.price === 0) ||
                        (filters.price_range.includes('Paid') && template.price > 0);    
    return matchesEngine && matchesType && matchesPrice;
  });
};