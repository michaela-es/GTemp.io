export const formatImageUrl = (imagePath, baseUrl = 'http://localhost:8080') => {
  if (!imagePath) return '/default-cover.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.includes('\\')) {
    return `${baseUrl}/${imagePath.replace(/\\/g, '/')}`;
  }
  return `${baseUrl}/${imagePath}`;
};

export const getTemplateCarouselImages = (template) => {
  if (!template) return [];
  
  const images = [];
  
  if (template.coverImagePath) {
    images.push(formatImageUrl(template.coverImagePath));
  }
  
  if (template.images && Array.isArray(template.images)) {
    template.images.forEach(templateImage => {
      if (templateImage.imagePath) {
        images.push(formatImageUrl(templateImage.imagePath));
      }
    });
  }
  
  return [...new Set(images)];
};

export const getImageFromTemplateImage = (templateImage) => {
  if (!templateImage) return '/default-cover.jpg';
  return formatImageUrl(templateImage.imagePath);
};