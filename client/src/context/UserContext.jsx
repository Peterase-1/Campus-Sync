import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from token on mount
  useEffect(() => {
    const token = localStorage.getItem('campusSyncToken');

    if (token) {
      // Decode JWT to get user info (without verification - just for display)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload);
      } catch (e) {
        console.error('Invalid token');
        localStorage.removeItem('campusSyncToken');
      }
    }
    setIsLoading(false);
  }, []);

  const createAccount = async (userData) => {
    try {
      const { authAPI } = await import('../utils/api');
      const response = await authAPI.register(userData);

      // Store only token
      localStorage.setItem('campusSyncToken', response.token);

      // Decode user from token
      const payload = JSON.parse(atob(response.token.split('.')[1]));
      setUser(payload);

      return payload;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const { authAPI } = await import('../utils/api');
      const response = await authAPI.login(email, password);

      // Store only token
      localStorage.setItem('campusSyncToken', response.token);

      // Decode user from token
      const payload = JSON.parse(atob(response.token.split('.')[1]));
      setUser(payload);

      return payload;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    // No localStorage update - rely on backend
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
    // No localStorage update - rely on backend
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campusSyncToken');
    // No need to remove cumpasSyncUser - we don't store it anymore
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
