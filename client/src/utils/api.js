import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

// Goals API
export const goalsAPI = {
  getAll: async () => {
    const response = await api.get('/goals');
    return response.data;
  },
  create: async (goalData) => {
    const response = await api.post('/goals', goalData);
    return response.data;
  },
  update: async (id, updates) => {
    const response = await api.patch(`/goals/${id}`, updates);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/goals/${id}`);
    return response.data;
  },
};

// Timetable API
export const timetableAPI = {
  getAll: async () => {
    const response = await api.get('/timetable');
    return response.data;
  },
  create: async (classData) => {
    const response = await api.post('/timetable', classData);
    return response.data;
  },
  update: async (id, updates) => {
    const response = await api.patch(`/timetable/${id}`, updates);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/timetable/${id}`);
    return response.data;
  },
  getAttendance: async (classId) => {
    const response = await api.get(`/timetable/${classId}/attendance`);
    return response.data;
  },
  markAttendance: async (attendanceData) => {
    const response = await api.post('/timetable/attendance', attendanceData);
    return response.data;
  },
};

// Pomodoro API
export const pomodoroAPI = {
  getSessions: async () => {
    const response = await api.get('/pomodoro');
    return response.data;
  },
  createSession: async (sessionData) => {
    const response = await api.post('/pomodoro', sessionData);
    return response.data;
  },
  completeSession: async (id) => {
    const response = await api.patch(`/pomodoro/${id}/complete`);
    return response.data;
  },
  getStats: async () => {
    const response = await api.get('/pomodoro/stats');
    return response.data;
  },
};

// Notes API
export const notesAPI = {
  getAll: async (archived = false) => {
    const response = await api.get(`/notes?archived=${archived}`);
    return response.data;
  },
  create: async (noteData) => {
    const response = await api.post('/notes', noteData);
    return response.data;
  },
  update: async (id, updates) => {
    const response = await api.patch(`/notes/${id}`, updates);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  },
};

export default api;
