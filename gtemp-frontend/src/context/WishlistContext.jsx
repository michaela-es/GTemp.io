import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.userID;

  const [wishlist, setWishlist] = useState([]);
  const [wishlistTemplates, setWishlistTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const resIds = await fetch(`http://localhost:8080/api/wishlist/user/${userId}`);
      const wishlistItems = await resIds.json();

      const templateIds = wishlistItems.map(item => item.templateId);
      setWishlist(templateIds);

      const templates = await Promise.all(
        templateIds.map(async id => {
          const res = await fetch(`http://localhost:8080/api/templates/${id}`);
          const template = await res.json();

          return {
            ...template,
            coverImagePath: template.coverImagePath
              ? `http://localhost:8080/${template.coverImagePath.replace(/\\/g, '/')}`
              : 'http://localhost:8080/default-image.png',
          };
        })
      );

      setWishlistTemplates(templates);
    } catch (err) {
      console.error("Error loading wishlist:", err);
      setWishlist([]);
      setWishlistTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async (templateId) => {
    if (!userId) return;

    try {
      await fetch(`http://localhost:8080/api/wishlist/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, templateId })
      });

      setWishlist(prev => {
        if (prev.includes(Number(templateId))) {
          return prev.filter(id => id !== Number(templateId));
        } else {
          return [...prev, Number(templateId)];
        }
      });
    } catch (err) {
      console.error('Error toggling wishlist:', err);
    }
  };

  const isInWishlist = (templateId) => wishlist.includes(Number(templateId));

  useEffect(() => {
    if (userId) loadWishlist();
  }, [userId]);

  return (
    <WishlistContext.Provider value={{
      wishlist,
      wishlistTemplates,
      wishlistCount: wishlist.length,
      toggleWishlist,
      isInWishlist,
      loading,
      loadWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
