import { useAuth } from "../contexts/AuthContext";
import TemplateGrid from "./TemplateGrid";
import { useWishlist } from "../contexts/WishlistContext";
import { useTemplates } from "../contexts/TemplatesContext";
import '../styles/Wishlist.css'; 
const WishListContainer = () => {
  const { currentUser } = useAuth();
  const { templates, loading } = useTemplates();
  const { wishlist, wishlistCount } = useWishlist();

  if (currentUser === undefined) return <div>Loading user info...</div>;
  if (!currentUser) return <div>Please log in to view your wishlist.</div>;
  if (loading) return <div>Loading templates...</div>;

  const wishlistedTemplates = templates.filter(template =>
    wishlist.includes(Number(template.templateID))
  );

  return (
    <div className="wishlist-container">
      {wishlistCount === 0 ? (
        <p className="empty-message">Your wishlist is empty.</p>
      ) : (
        <TemplateGrid templates={wishlistedTemplates} />
      )}
    </div>
  );
};

export default WishListContainer;
