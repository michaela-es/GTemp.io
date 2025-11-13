import React, { createContext, useContext, useState } from 'react';
import { userService } from '../services'; // <- only this one

const API_BASE = 'http://localhost:8080/api';
const AuthContext = createContext();
const USE_LOCAL_DATA = true;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
const [currentUser, setCurrentUser] = useState(() => {
  const saved = localStorage.getItem('currentUser');
  return saved ? JSON.parse(saved) : null;
});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await userService.register(userData);
      setCurrentUser(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
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
    localStorage.setItem('currentUser', JSON.stringify(result)); // persist
    return result;
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};

const logout = () => {
  setCurrentUser(null);
  setError(null);
  localStorage.removeItem('currentUser'); // clear on logout
};

  const value = {
    currentUser,
    loading,
    error,
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