import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('cumpasSyncUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('cumpasSyncUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('cumpasSyncUser');
    }
  }, [user]);

  const createAccount = (userData) => {
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      university: userData.university,
      major: userData.major,
      createdAt: new Date().toISOString(),
      preferences: {
        theme: 'light',
        notifications: true,
        language: 'en'
      },
      data: {
        habits: [],
        finances: {
          transactions: [],
          goals: []
        },
        studies: {
          notes: [],
          tasks: [],
          resources: []
        },
        goals: []
      }
    };
    setUser(newUser);
    return newUser;
  };

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const updateUserData = (section, data) => {
    setUser(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [section]: data
      }
    }));
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    createAccount,
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
