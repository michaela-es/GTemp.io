import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import TemplateGrid from "./Templates/TemplateGrid";

const WishListContainer = () => {
  const { wishlistTemplates, loading } = useWishlist();
  const { currentUser } = useAuth();
  
  if (!currentUser) return <div>Log in to access wishlist</div>;
  if (loading) return <div>Loading wishlist...</div>;
  if (wishlistTemplates.length === 0) return <p>Your wishlist is empty.</p>;

  return <TemplateGrid templates={wishlistTemplates} />;
};

export default WishListContainer;
