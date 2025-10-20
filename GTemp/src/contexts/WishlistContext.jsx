import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './UserContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id?.toString() || null;

  const [wishlist, setWishlist] = useState([]);

  // Load wishlist for current user when userId changes
  useEffect(() => {
    if (!userId) {
      setWishlist([]); // no user, empty wishlist
      return;
    }

    try {
      const savedWishlist = localStorage.getItem(`wishlist_${userId}`);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      } else {
        setWishlist([]);
      }
    } catch {
      setWishlist([]);
    }
  }, [userId]);

  // Save wishlist for current user when it changes
  useEffect(() => {
    if (!userId) return; // don’t save if no user
    localStorage.setItem(`wishlist_${userId}`, JSON.stringify(wishlist));
  }, [wishlist, userId]);

  // Wishlist operations
  const addToWishlist = (templateID) => {
    if (!userId) return;
    setWishlist((prev) => (prev.includes(templateID) ? prev : [...prev, templateID]));
  };

  const removeFromWishlist = (templateID) => {
    if (!userId) return;
    setWishlist((prev) => prev.filter(id => id !== templateID));
  };

  const toggleWishlist = (templateID) => {
    if (!userId) {
      alert('Please login to manage wishlist');
      return;
    }
    setWishlist((prev) =>
      prev.includes(templateID) ? prev.filter(id => id !== templateID) : [...prev, templateID]
    );
  };

  const isInWishlist = (templateID) => wishlist.includes(templateID);

  const clearWishlist = () => {
    if (!userId) return;
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
