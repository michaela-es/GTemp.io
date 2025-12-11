import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      console.log('Session expired. Please login again.');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/users/register', userData);
    const { token, userId, username, email, wallet } = response.data;
    
    localStorage.setItem('token', token);
    
    return { userId, username, email, wallet, token };
  },

  login: async (loginData) => {
    const response = await api.post('/login', loginData);
    const { token, userId, username, email, wallet } = response.data;
    
    localStorage.setItem('token', token);
    
    return { userId, username, email, wallet, token };
  },

  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
  
  logout: async () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
};

export { api };