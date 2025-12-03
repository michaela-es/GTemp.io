import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '../services/api';
import axios from 'axios';
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

  // Load user data on initial mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log("AuthProvider: Checking auth status on mount...");
        const savedUser = localStorage.getItem('currentUser');
        console.log("AuthProvider: Saved user from localStorage:", savedUser);
        
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setCurrentUser(parsedUser);
        } else {
          console.log("AuthProvider: No saved user found");
        }
      } catch (err) {
        console.error('Auth check error:', err);
      } finally {
        console.log("AuthProvider: Initialization complete");
        setInitializing(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'currentUser') {
        console.log("AuthProvider: Storage changed, updating state");
        if (e.newValue) {
          setCurrentUser(JSON.parse(e.newValue));
        } else {
          setCurrentUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
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
      console.log("AuthProvider: Attempting login...");
      const result = await userService.login(loginData);
      console.log("AuthProvider: Login result:", result);
      
      setCurrentUser(result);
      localStorage.setItem('currentUser', JSON.stringify(result));
      console.log("AuthProvider: User saved to localStorage and state");
      
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

  const refreshWallet = async () => {
    if (!currentUser?.email) return;

    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${currentUser.email}/wallet`
      );
      setCurrentUser(prev => ({ ...prev, wallet: response.data.wallet }));
    } catch (err) {
      console.error("Failed to refresh wallet", err);
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    loading,
    error,
    initializing,
    register,
    login,  
    logout,
    setError,
    refreshWallet,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};