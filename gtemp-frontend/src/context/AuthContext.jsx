import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('currentUser');

      if (token && savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
      setInitializing(false);
    };

    initAuth();
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const register = (user) => {
    setCurrentUser(user);
  };

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setError(null);
  };

  const updateUser = (updatedData) => {
    setCurrentUser(prev => ({ ...prev, ...updatedData }));
  };

  const addToWallet = (newWalletAmount) => {
    setCurrentUser(prev => ({
      ...prev,
      wallet: newWalletAmount
    }));
  };

  const value = {
    currentUser,
    loading,
    error,
    initializing,
    register,
    login,
    logout,
    updateUser,
    addToWallet,
    setError,
    setLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};