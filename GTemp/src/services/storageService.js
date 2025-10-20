export const storageService = {
  getUserTemplates: () => {
    const stored = localStorage.getItem('userTemplates');
    if (stored) {
      return JSON.parse(stored);
    }
    return []; 
  },

  addTemplate: async (templateData) => {
    const userTemplates = storageService.getUserTemplates();
    
    const newTemplate = {
      ...templateData,
      templateID: Math.max(...userTemplates.map(t => t.templateID), 0) + 1,
      releaseDate: new Date().toISOString().split('T')[0],
      templateRating: 0,
      templateDls: 0,
      isWishlisted: false
    };
    
    const updatedTemplates = [...userTemplates, newTemplate];
    localStorage.setItem('userTemplates', JSON.stringify(updatedTemplates));
    return newTemplate;
  },

  getAllTemplates: async () => {
    try {
      const [initialData, userTemplates] = await Promise.all([
        fetch('/data.json').then(res => res.json()),
        Promise.resolve(storageService.getUserTemplates()) 
      ]);
      
      return [...initialData, ...userTemplates];
    } catch (error) {
      console.error('Error loading templates:', error);
      return storageService.getUserTemplates();
    }
  }
};