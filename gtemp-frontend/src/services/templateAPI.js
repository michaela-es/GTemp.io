import api from './api'; 
export const templateAPI = {
  getTemplate: async (templateId) => {
    const response = await api.get(`/templates/${templateId}`);
    return response.data;
  },

  getTemplateImages: async (templateId) => {
    const response = await api.get(`/templates/${templateId}/images`);
    return response.data;
  },

  downloadTemplate: async (templateId) => {
    const response = await api.get(`/templates/${templateId}/download/free`, {
      responseType: 'blob'
    });
    return response;
  },

  purchaseTemplate: async (templateId, amount = 0) => {
    const response = await api.post(`/templates/${templateId}/purchase`, null, {
      params: { donationAmount: amount }
    });
    return response.data;
  },

  checkPurchase: async () => {
    const response = await api.get('/templates/user/library');
    return response.data;
  }
};