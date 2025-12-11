import api from './api';

const wishlistService = {
  getMyWishlist: async () => {
    try {
      const response = await api.get('/wishlist/my-wishlist');
      console.log('Server wishlist:', response.data);
      return response.data;
    } catch (error) {
      console.error('Server fetch failed, using localStorage fallback:', error);
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : [];
    }
  },

  addToWishlist: async (templateId) => {
    try {
      const response = await api.post('/wishlist', { templateId });
      return response.data;
    } catch (error) {
      console.error('Server add failed, saving locally:', error);
      throw error;
    }
  },

  removeFromWishlist: async (templateId) => {
    try {
      await api.delete(`/wishlist/template/${templateId}`);
    } catch (error) {
      console.error('Server remove failed:', error);
      throw error;
    }
  },

  toggleWishlist: async (templateId) => {
    try {
      const response = await api.post('/wishlist/toggle', { templateId });
      return response.data;
    } catch (error) {
      console.error('Server toggle failed:', error);
      throw error;
    }
  },

  getLocalWishlist: () => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  },

  clearLocalWishlist: () => {
    localStorage.removeItem('wishlist');
  }
};

export default wishlistService;