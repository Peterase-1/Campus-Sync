import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from token on mount
  useEffect(() => {
    const token = localStorage.getItem('campusSyncToken');
    const savedUser = localStorage.getItem('cumpasSyncUser');

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const createAccount = async (userData) => {
    try {
      const { authAPI } = await import('../utils/api');
      const response = await authAPI.register(userData);

      // Store token and user
      localStorage.setItem('campusSyncToken', response.token);
      localStorage.setItem('cumpasSyncUser', JSON.stringify(response.user));
      setUser(response.user);

      return response.user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const { authAPI } = await import('../utils/api');
      const response = await authAPI.login(email, password);

      // Store token and user
      localStorage.setItem('campusSyncToken', response.token);
      localStorage.setItem('cumpasSyncUser', JSON.stringify(response.user));
      setUser(response.user);

      return response.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('cumpasSyncUser', JSON.stringify(updatedUser));
  };

  const updateUserData = (section, data) => {
    const updatedUser = {
      ...user,
      data: {
        ...user.data,
        [section]: data
      }
    };
    setUser(updatedUser);
    localStorage.setItem('cumpasSyncUser', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campusSyncToken');
    localStorage.removeItem('cumpasSyncUser');
  };

  const value = {
    user,
    isLoading,
    createAccount,
    login,
    updateUser,
    updateUserData,
    logout,
    isAuthenticated: !!user
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
