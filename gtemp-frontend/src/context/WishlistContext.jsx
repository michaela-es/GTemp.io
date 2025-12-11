import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import wishlistService from '../services/wishlistService';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const saved = localStorage.getItem('wishlist');
        if (saved) {
          const parsed = JSON.parse(saved);
          console.log('Loaded wishlist from localStorage:', parsed);
          setWishlist(Array.isArray(parsed) ? parsed : []);
        }
      } catch (err) {
        console.error('Error loading wishlist from localStorage:', err);
      } finally {
        setInitialized(true);
      }
    };

    loadFromStorage();
  }, []);

  useEffect(() => {
    if (initialized) {
      console.log('Saving wishlist to localStorage:', wishlist);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, initialized]);

  useEffect(() => {
    if (initialized) {
      fetchWishlist();
    }
  }, [initialized]);

  const fetchWishlist = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await wishlistService.getMyWishlist();
      console.log('Fetched wishlist from server:', data);
      
      const serverWishlist = Array.isArray(data) ? data : [];
      setWishlist(prev => {
        const itemMap = new Map();
        
        serverWishlist.forEach(item => {
          const key = item.templateId || item.id;
          if (key) itemMap.set(key, item);
        });
        
        prev.forEach(item => {
          const key = item.templateId || item.id;
          if (key && !itemMap.has(key)) {
            itemMap.set(key, item);
          }
        });
        
        return Array.from(itemMap.values());
      });
    } catch (error) {
      console.error('Failed to fetch wishlist from server:', error);
      setError('Failed to sync with server. Using local data.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addToWishlist = useCallback(async (templateId) => {
    if (!templateId) return { success: false, message: 'No template ID' };
    
    setError(null);
    try {
      const item = await wishlistService.addToWishlist(templateId);
      console.log('Added to server wishlist:', item);
      
      setWishlist(prev => {
        const prevArray = Array.isArray(prev) ? prev : [];
        const exists = prevArray.some((item) => 
          item.templateId === templateId || item.id === templateId
        );
        
        if (!exists) {
          const newItem = item || { templateId };
          return [...prevArray, newItem];
        }
        return prevArray;
      });
      
      return { success: true, data: item };
    } catch (error) {
      console.error('Failed to add to server, saving locally:', error);
      
      setWishlist(prev => {
        const prevArray = Array.isArray(prev) ? prev : [];
        const exists = prevArray.some((item) => 
          item.templateId === templateId || item.id === templateId
        );
        
        if (!exists) {
          return [...prevArray, { templateId }];
        }
        return prevArray;
      });
      
      return { 
        success: true, 
        data: { templateId },
        message: 'Saved locally (offline)' 
      };
    }
  }, []);

  const removeFromWishlist = useCallback(async (templateId) => {
    setError(null);
    try {
      await wishlistService.removeFromWishlist(templateId);
      console.log('Removed from server wishlist:', templateId);
    } catch (error) {
      console.error('Failed to remove from server:', error);
    }
    
    setWishlist(prev => {
      const prevArray = Array.isArray(prev) ? prev : [];
      return prevArray.filter((item) => 
        !(item.templateId === templateId || item.id === templateId)
      );
    });
    
    return { success: true };
  }, []);

  const toggleWishlist = useCallback(async (templateId) => {
    console.log('Toggling wishlist for template:', templateId);
    
    const isCurrentlyInWishlist = wishlist.some(item => 
      item.templateId === templateId || item.id === templateId
    );
    
    if (isCurrentlyInWishlist) {
      const result = await removeFromWishlist(templateId);
      return { 
        success: result.success, 
        data: false,
        message: result.message 
      };
    } else {
      const result = await addToWishlist(templateId);
      return { 
        success: result.success, 
        data: true, 
        message: result.message 
      };
    }
  }, [wishlist, addToWishlist, removeFromWishlist]);

  const isInWishlist = useCallback((templateId) => {
    return wishlist.some(item => 
      item.templateId === templateId || item.id === templateId
    );
  }, [wishlist]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
    localStorage.removeItem('wishlist');
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        error,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        fetchWishlist,
        clearError,
        clearWishlist,
        wishlistCount: wishlist.length,
        isEmpty: wishlist.length === 0,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};