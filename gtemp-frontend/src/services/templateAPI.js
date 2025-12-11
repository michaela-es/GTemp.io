import { api } from './authAPI';

export const templateAPI = {
  getTemplate: async (id) => {
    const response = await api.get(`/templates/${id}`);
    return response.data;
  },

  getTemplateImages: async (id) => {
    const response = await api.get(`/templates/${id}/images`);
    return response.data;
  },

  getTemplateRatedUsers: async (id) => {
    const response = await api.get(`/templates/${id}/rated-users`);
    return response.data;
  },

  getHomepageTemplates: async () => {
    const response = await api.get('/homepage');
    return response.data;
  },

  createTemplate: async (templateData) => {
    const response = await api.post('/templates', templateData);
    return response.data;
  },

  updateTemplate: async (id, templateData) => {
    const response = await api.put(`/templates/${id}`, templateData);
    return response.data;
  },

  downloadTemplate: async (id, userId) => {
    const response = await api.get(`/templates/${id}/download/free?userID=${userId}`);
    return response;
  },

  checkPurchase: async (userId) => {
    const response = await api.get(`/templates/user/${userId}/library`);
    return response.data;
  },

  purchaseTemplate: async (templateId, userId, donationAmount = 0) => {
    const params = new URLSearchParams({
      userID: userId,
      ...(donationAmount > 0 && { donationAmount })
    });
    const response = await api.post(`/templates/${templateId}/purchase?${params}`);
    return response.data;
  },
};