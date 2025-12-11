import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshWallet = async () => {
    if (!currentUser || !token) {
      console.error('Cannot refresh wallet: No current user or token found.');
      return;
    }

    try {
      const response = await api.get('/users/me');
      const updatedUser = response.data;
      setCurrentUser(updatedUser);
      console.log('Wallet refreshed:', updatedUser.wallet);
    } catch (error) {
      console.error('Error refreshing wallet:', error);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('currentUser');
    
    console.log('AuthProvider: Initializing from localStorage...');
    console.log('Token exists:', !!savedToken);
    console.log('User exists:', !!savedUser);
    
    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setToken(savedToken);
        setCurrentUser(parsedUser);
        console.log('AuthProvider: User loaded:', parsedUser.username);
      } catch (error) {
        console.error('AuthProvider: Error parsing user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log('AuthContext token changed:', !!token);
    console.log('AuthContext user changed:', currentUser?.username);
    
    if (token && currentUser) {
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else if (!token) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    }
  }, [token, currentUser]);

  const login = ({ userId, username, email, wallet, token }) => {
    console.log('AuthContext.login() called with token:', token ? 'YES' : 'NO');
    console.log('Token value:', token?.substring(0, 20) + '...');
    
    if (!token) {
      console.error('AuthContext.login() received NO token!');
      return;
    }
    
    const user = { userId, username, email, wallet };
    setToken(token);  
    setCurrentUser(user);
    
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    console.log('AuthContext.login() completed');
  };

  const logout = () => {
    console.log('AuthContext.logout() called');
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  };

  const updateUser = (updatedData) => {
    console.log('AuthContext.updateUser() called with:', updatedData);
    setCurrentUser(prev => {
      const newUser = { ...prev, ...updatedData };
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      return newUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        loading,
        login,
        logout,
        updateUser, 
        isAuthenticated: !!token,
        refreshWallet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
