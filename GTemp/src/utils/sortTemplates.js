export const sortTemplates = (templates, activeSorts) => {
  if (activeSorts.length === 0) return templates;

  return [...templates].sort((a, b) => {
    for (const sort of activeSorts) {
      let result = 0;
      switch (sort) {
        case 'popular':
          result = b.templateDls - a.templateDls;
          break;
        case 'rating':
          result = b.templateRating - a.templateRating;
          break;
        case 'price':
          result = a.price - b.price;
          break;
        case 'recent':
          const dateA = new Date(a.releaseDate || 0);
          const dateB = new Date(b.releaseDate || 0);
          result = dateB - dateA;  
          break;
        default:
          result = 0;
      }
      if (result !== 0) return result;
    }
    return 0;
  });
};
