import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '../services/api';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
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
          const parsedUser = JSON.parse(savedUser);
          setCurrentUser(parsedUser);
          if (parsedUser?.id) refreshWallet(parsedUser.id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setInitializing(false);
      }
    };
    checkAuthStatus();
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'currentUser') {
        if (e.newValue) setCurrentUser(JSON.parse(e.newValue));
        else setCurrentUser(null);
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
      const msg = err.response?.data?.message || err.message || 'Registration failed';
      setError(msg);
      throw new Error(msg);
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
      if (result?.id) refreshWallet(result.id);
      return result;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed';
      setError(msg);
      throw new Error(msg);
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

  const refreshWallet = async (userId) => {
    if (!userId) return;
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${userId}/wallet`);
      const updatedUser = { ...(currentUser || { id: userId }), wallet: response.data.wallet };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      setCurrentUser,
      loading,
      error,
      initializing,
      register,
      login,
      logout,
      setError,
      refreshWallet
    }}>
      {children}
    </AuthContext.Provider>
  );
};
