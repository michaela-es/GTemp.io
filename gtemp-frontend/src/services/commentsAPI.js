import api from './api';

export const commentsAPI = {
  addComment: async (commentData) => {
    try {
      console.log('Adding comment:', commentData);
      const response = await api.post('/comments', commentData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error adding comment:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Failed to add comment',
        status: error.response?.status
      };
    }
  },

  getComments: async (templateId) => {
    try {
      const response = await api.get(`/comments/template/${templateId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching comments:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Failed to fetch comments',
        status: error.response?.status
      };
    }
  },

};