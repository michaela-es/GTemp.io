import { api } from './authAPI';

export const userAPI = {
  updateUser: async (userData) => {
    const response = await api.put('/users', userData);
    return response.data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await api.post('/users/change-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  },

  addToWallet: async (amount) => {
    const response = await api.post('/users/wallet/add', { amount });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
};