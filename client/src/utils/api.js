import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('campusSyncToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

// Habits API
export const habitsAPI = {
  getAll: async () => {
    const response = await api.get('/habits');
    return response.data;
  },
  create: async (habitData) => {
    const response = await api.post('/habits', habitData);
    return response.data;
  },
  update: async (id, updates) => {
    const response = await api.patch(`/habits/${id}`, updates);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/habits/${id}`);
    return response.data;
  },
};

// Finance API
export const financeAPI = {
  getTransactions: async () => {
    const response = await api.get('/finance/transactions');
    return response.data;
  },
  createTransaction: async (transactionData) => {
    const response = await api.post('/finance/transactions', transactionData);
    return response.data;
  },
  deleteTransaction: async (id) => {
    const response = await api.delete(`/finance/transactions/${id}`);
    return response.data;
  },
};

// Study API
export const studyAPI = {
  getNotes: async () => {
    const response = await api.get('/study/notes');
    return response.data;
  },
  createNote: async (noteData) => {
    const response = await api.post('/study/notes', noteData);
    return response.data;
  },
  deleteNote: async (id) => {
    const response = await api.delete(`/study/notes/${id}`);
    return response.data;
  },
  getTasks: async () => {
    const response = await api.get('/study/tasks');
    return response.data;
  },
  createTask: async (taskData) => {
    const response = await api.post('/study/tasks', taskData);
    return response.data;
  },
  updateTask: async (id, updates) => {
    const response = await api.patch(`/study/tasks/${id}`, updates);
    return response.data;
  },
  deleteTask: async (id) => {
    const response = await api.delete(`/study/tasks/${id}`);
    return response.data;
  },
};

export default api;
