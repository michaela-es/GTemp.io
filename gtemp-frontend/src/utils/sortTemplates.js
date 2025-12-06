export const sortTemplates = (templates, activeSorts) => {
  if (activeSorts.length === 0) return templates;

  return [...templates].sort((a, b) => {
    for (const sort of activeSorts) {
      let result = 0;
      switch (sort) {
        case 'popular':
          result = b.downloadCount - a.downloadCount;
          break;
        case 'rating':
          result = b.averageRating - a.averageRating;
          break;
        case 'price':
          result = a.price - b.price;
          break;
        default:
          result = 0;
      }
      if (result !== 0) return result;
    }
    return 0;
  });
};
