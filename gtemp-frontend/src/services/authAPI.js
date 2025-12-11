import { apiClient } from './apiClient';

export const authAPI = {
  login: async (loginData) => {
    try {
      console.log('authAPI.login called with:', loginData);
      
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      
      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('authAPI.login response:', data);
      
      if (!data.token) {
        throw new Error('No token in response');
      }
      
      return {
        token: data.token,
        userId: data.userId || data.userID,
        username: data.username,
        email: data.email,
        wallet: data.wallet || 0
      };
      
    } catch (error) {
      console.error('authAPI.login error:', error);
      throw error;
    }
  },

  register: async (registerData) => {
    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      });
      
      if (!response.ok) {
        throw new Error(`Registration failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.token) {
        throw new Error('No token in response');
      }
      
      return {
        token: data.token,
        userId: data.userId || data.userID,
        username: data.username,
        email: data.email,
        wallet: data.wallet || 0
      };
    } catch (error) {
      console.error('authAPI.register error:', error);
      throw error;
    }
  }
};

export {authAPI as api};