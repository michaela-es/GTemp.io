import React from 'react';
import { UserProvider } from './UserContext';
import { AppDataProvider } from './AppDataContext';
import { TemplatesProvider } from './TemplatesContext';
import { WishlistProvider } from './WishlistContext';

export const AppProvider = ({ children }) => {
  return (
    <UserProvider>
      <WishlistProvider> 
        <AppDataProvider>
          <TemplatesProvider>
            {children}
          </TemplatesProvider>
        </AppDataProvider>
      </WishlistProvider>
    </UserProvider>
  );
};