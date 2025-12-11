import { apiClient } from './apiClient';

export const userAPI = {
  updateUser: async (userData) => {
    try {
      const response = await apiClient.put('/users', userData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Failed to update user'
      };
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await apiClient.post('/users/change-password', {
        currentPassword,
        newPassword
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Failed to change password'
      };
    }
  },

  addToWallet: async (amount) => {
    try {
      const response = await apiClient.post('/users/wallet/add', { amount });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Failed to add to wallet'
      };
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/users/me');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Failed to get user data'
      };
    }
  },
};