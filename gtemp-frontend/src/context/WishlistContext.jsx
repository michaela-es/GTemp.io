import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    if (!currentUser?.id) {
      setWishlist([]);
      setWishlistCount(0);
      return;
    }
    loadWishlist();
  }, [currentUser]);

  const loadWishlist = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/wishlist/user/${currentUser.id}`
      );
      if (!response.ok) throw new Error("Failed to load wishlist");
      const data = await response.json();
      // Map wishlist items to template IDs only
      const templateIds = data.map(item => item.templateId);
      setWishlist(templateIds);
      setWishlistCount(templateIds.length);
    } catch (err) {
      console.error("Error loading wishlist:", err);
      setWishlist([]);
      setWishlistCount(0);
    }
  };

  const toggleWishlist = async (templateId) => {
    if (!currentUser?.id) return;

    const isInWishlist = wishlist.includes(templateId);
    try {
      const url = `http://localhost:8080/api/wishlist/toggle`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id, templateId })
      });

      if (!response.ok) throw new Error("Failed to toggle wishlist");
      const isNowInWishlist = await response.json();
      
      if (isNowInWishlist) {
        setWishlist(prev => [...prev, templateId]);
        setWishlistCount(prev => prev + 1);
      } else {
        setWishlist(prev => prev.filter(id => id !== templateId));
        setWishlistCount(prev => prev - 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, wishlistCount, toggleWishlist, loadWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
