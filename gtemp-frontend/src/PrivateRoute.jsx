import React from 'react';
import { Route, Navigate } from 'react-router-dom';  // Use Navigate in v6
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/" />} 
    />
  );
};

export default PrivateRoute;
