import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { currentUser } = useAuth();
  
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    if (currentUser?.userID) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
      setWishlistIds([]);
    }
  }, [currentUser?.userID]);

  const fetchWishlist = async () => {
    if (!currentUser?.userID) return;
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/wishlist/user/${currentUser.userID}`);
      if (!response.ok) throw new Error('Failed to fetch wishlist');
      
      const items = await response.json();
      
      const templateIds = items.map(item => item.templateId);
      setWishlistIds(templateIds);
      
      const templatesPromises = templateIds.map(async (templateId) => {
        const templateRes = await fetch(`http://localhost:8080/api/templates/${templateId}`);
        const template = await templateRes.json();
        
        return {
          ...template,
          coverImagePath: template.coverImagePath
            ? `http://localhost:8080/${template.coverImagePath.replace(/\\/g, '/')}`
            : 'http://localhost:8080/default-image.png',
        };
      });
      
      const templates = await Promise.all(templatesPromises);
      setWishlistItems(templates);
      
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      setWishlistItems([]);
      setWishlistIds([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async (templateId) => {
    if (!currentUser?.userID) return false;

    try {
      const response = await fetch(`http://localhost:8080/api/wishlist/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: currentUser.userID, 
          templateId: templateId 
        })
      });

      if (!response.ok) throw new Error('Failed to toggle wishlist');
      
      const isNowInWishlist = await response.json();
      
      if (isNowInWishlist) {
        const templateRes = await fetch(`http://localhost:8080/api/templates/${templateId}`);
        const template = await templateRes.json();
        
        setWishlistItems(prev => [...prev, {
          ...template,
          coverImagePath: template.coverImagePath
            ? `http://localhost:8080/${template.coverImagePath.replace(/\\/g, '/')}`
            : 'http://localhost:8080/default-image.png',
        }]);
        setWishlistIds(prev => [...prev, templateId]);
      } else {
        setWishlistItems(prev => prev.filter(item => item.id !== templateId));
        setWishlistIds(prev => prev.filter(id => id !== templateId));
      }
      
      return isNowInWishlist;
    } catch (err) {
      console.error('Error toggling wishlist:', err);
      return false;
    }
  };

  const isInWishlist = (templateId) => wishlistIds.includes(Number(templateId));

  const refreshWishlist = () => {
    if (currentUser?.userID) {
      fetchWishlist();
    }
  };

  return (
    <WishlistContext.Provider value={{
      wishlistTemplates: wishlistItems,
      wishlistItems,
      wishlistIds,
      wishlistCount: wishlistIds.length,
      toggleWishlist,
      isInWishlist,
      loading,
      refreshWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);