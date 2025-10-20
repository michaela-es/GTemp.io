import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAuth } from './UserContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlists, setWishlists] = useState({}); 
  const { user } = useAuth();
  
  const wishlist = useMemo(() => {
    if (!user) return [];
    return wishlists[user.id] || [];
  }, [user, wishlists]);

  const wishlistCount = wishlist.length;

  useEffect(() => {
    const saved = localStorage.getItem('wishlists');
    if (saved) {
      setWishlists(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlists', JSON.stringify(wishlists));
  }, [wishlists]);

  const addToWishlist = (templateID) => {
    if (!user) {
      alert('Please login to add to wishlist');
      return;
    }
    
    setWishlists(prev => {
      const userWishlist = prev[user.id] || [];
      if (!userWishlist.includes(templateID)) {
        return {
          ...prev,
          [user.id]: [...userWishlist, templateID]
        };
      }
      return prev;
    });
  };

  const removeFromWishlist = (templateID) => {
    if (!user) return;
    
    setWishlists(prev => ({
      ...prev,
      [user.id]: (prev[user.id] || []).filter(id => id !== templateID)
    }));
  };

  const toggleWishlist = (templateID) => {
    if (!user) {
      alert('Please login to manage wishlist');
      return;
    }

    if (wishlist.includes(templateID)) {
      removeFromWishlist(templateID);
    } else {
      addToWishlist(templateID);
    }
  };

  const isInWishlist = (templateID) => {
    return wishlist.includes(templateID);
  };

  const clearWishlist = () => {
    if (!user) return;
    setWishlists(prev => ({
      ...prev,
      [user.id]: []
    }));
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      wishlistCount,
      wishlists,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);