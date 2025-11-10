import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '../services/api';

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
    const checkAuthStatus = async () => {
      try {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          setCurrentUser(JSON.parse(savedUser));
        }
      } catch (err) {
        console.error('Auth check error:', err);
      } finally {
        setInitializing(false);
      }
    };

    checkAuthStatus();
  }, []);

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await userService.register(userData);
      setCurrentUser(result);
      localStorage.setItem('currentUser', JSON.stringify(result));
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await userService.login(loginData);
      setCurrentUser(result);
      localStorage.setItem('currentUser', JSON.stringify(result));
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setError(null);
    localStorage.removeItem('currentUser');
    userService.logout().catch(console.error);
  };

  const value = {
    currentUser,
    loading,
    error,
    initializing,
    register,
    login,  
    logout,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};