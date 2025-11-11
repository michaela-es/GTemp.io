const BASE_URL = 'http://localhost:8080/api';

const api = {
  post: async (endpoint, data) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Request failed');
    }
    
    return response.json();
  }
};

export const userService = {
  register: (userData) => api.post('/users', userData),
  login: (loginData) => api.post('/login', loginData)
};
