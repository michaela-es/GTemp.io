import React from 'react';
import { useAuth } from '../../contexts/UserContext';
import { useTemplates } from '../../contexts/TemplatesContext';
import { useWishlist } from '../../contexts/WishlistContext';
import TemplateGrid from '../TemplateGrid';





const WishListContainer = () => {
  const { user } = useAuth();
  const { templates, loading } = useTemplates();
  const { wishlist, wishlistCount } = useWishlist();

  if (user === undefined) return <div>Loading user info...</div>;
  if (!user) return <div>Please log in to view your wishlist.</div>;
  if (loading) return <div>Loading templates...</div>;

  const wishlistedTemplates = templates.filter(template =>
    wishlist.includes(template.templateID)
  );

  return (
    <div>

      {wishlistCount === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <TemplateGrid templates={wishlistedTemplates} />
      )}
    </div>
  );
};

export default WishListContainer;