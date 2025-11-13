import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { currentUser } = useAuth();
  
  const userId = currentUser?.id?.toString() || null;

const [wishlist, setWishlist] = useState(() => {
  if (!currentUser) return [];
  try {
    const saved = localStorage.getItem(`wishlist_${currentUser.id}`);
    return saved ? JSON.parse(saved).map(Number) : [];
  } catch {
    return [];
  }
});
  const [loadingWishlist, setLoadingWishlist] = useState(true);

  console.log('🔵 WishlistContext - UserId:', userId);
  console.log('🔵 WishlistContext - CurrentUser:', currentUser);


  useEffect(() => {
  if (currentUser === undefined) return; 
  if (!userId) {
    setWishlist([]);
    setLoadingWishlist(false);
    return;
  }

  try {
    const storageKey = `wishlist_${userId}`;
    const savedWishlist = localStorage.getItem(storageKey);
    if (savedWishlist) {
      const numericWishlist = JSON.parse(savedWishlist).map(id => Number(id));
      setWishlist(numericWishlist);
    } else {
      setWishlist([]);
    }
  } catch (err) {
    console.error('Error loading wishlist:', err);
    setWishlist([]);
  } finally {
    setLoadingWishlist(false);
  }
}, [currentUser, userId]);

useEffect(() => {
  if (!userId) return; 
  localStorage.setItem(`wishlist_${userId}`, JSON.stringify(wishlist));
}, [wishlist, userId]);
  useEffect(() => {
    if (!userId) {
      console.log('🟡 No userId, skipping save');
      return;
    }
    console.log('💾 Saving wishlist to localStorage:', wishlist);
    localStorage.setItem(`wishlist_${userId}`, JSON.stringify(wishlist));
  }, [wishlist, userId]);

  const toggleWishlist = (templateID) => {
    if (!userId) {
      alert('Please login to manage wishlist');
      return;
    }
    
    const id = Number(templateID);
    console.log('🔄 Toggling template ID:', id);
    console.log('🔄 Current wishlist before toggle:', wishlist);
    console.log('🔄 Is currently in wishlist?', wishlist.includes(id));
    
    setWishlist(prev => {
      const newWishlist = prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id];
      
      console.log('🔄 New wishlist after toggle:', newWishlist);
      return newWishlist;
    });
  };

const isInWishlist = (templateID) => {
  const id = Number(templateID);
  const result = wishlist.includes(id);
  console.log(`🔍 Checking if ${id} is in wishlist:`, result);
  console.log(`🔍 Current wishlist:`, wishlist);
  return result;
};
  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        addToWishlist: toggleWishlist,
        removeFromWishlist: toggleWishlist,
        loadingWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);