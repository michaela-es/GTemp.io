import React from 'react';
import { useWishlist } from '../../contexts/WishlistContext';
import { useTemplates } from '../../contexts/TemplatesContext';
import TemplateGrid from '../TemplateGrid';
import HeaderBar from '../HeaderBar';
import "../../styles/WishList.css";



const WishlistContainer = () => {
  const { wishlist, wishlistCount } = useWishlist();
  const { templates, loading } = useTemplates();

  if (loading) return <div>Loading...</div>;

  const wishlistedTemplates = templates.filter(template => 
    wishlist.includes(template.templateID)
  );

  return (
    <div className="app-container">
      <HeaderBar />
      <div className="wishlist-page">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p className="wishlist-count">
            {wishlistCount} {wishlistCount === 1 ? 'template' : 'templates'} saved
          </p>
        </div>
        
        {wishlistCount > 0 ? (
          <TemplateGrid templates={wishlistedTemplates} />
        ) : (
          <div className="empty-wishlist">
            <h2>Your wishlist is empty</h2>
            <p>Start browsing templates and add them to your wishlist!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistContainer;