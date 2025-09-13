import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  // Simple authentication simulation
  login: async (id, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any non-empty credentials
    if (id && password) {
      const userData = {
        id,
        name: `Officer ${id}`,
        role: 'Personnel Analyst',
        token: 'demo-token-' + Date.now()
      };
      localStorage.setItem('iaf-user', JSON.stringify(userData));
      return userData;
    }
    throw new Error('Invalid credentials');
  },

  logout: () => {
    localStorage.removeItem('iaf-user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('iaf-user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('iaf-user');
  }
};

export const personnelService = {
  predictPersonnel: async (personnelData) => {
    try {
      const response = await apiClient.post('/predict', personnelData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.error || 'API Error occurred');
      } else if (error.request) {
        throw new Error('Cannot connect to the API. Make sure the backend (app.py) is running.');
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }
};

export default { authService, personnelService };