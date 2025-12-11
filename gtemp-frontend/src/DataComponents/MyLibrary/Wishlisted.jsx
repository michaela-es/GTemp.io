import React from "react";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import TemplateVerticalContainer from "../../components/Templates/TemplateVerticalContainer";

const WishlistView = () => {
  const { currentUser } = useAuth();
  const { 
    wishlist, 
    loading, 
    wishlistCount,
    error,
    clearError,
    isEmpty 
  } = useWishlist();

  if (!currentUser)
    return <div className="text-center mt-4">Please log in to view your wishlist.</div>;
  
  if (loading)
    return <div className="text-center mt-4">Loading wishlist...</div>;
  
  if (error) {
    return (
      <div className="text-center mt-4">
        <div style={{ color: 'red' }}>Error: {error}</div>
        <button 
          onClick={clearError}
          className="btn btn-primary mt-2"
        >
          Dismiss
        </button>
      </div>
    );
  }

  if (isEmpty || wishlist.length === 0)
    return <div className="text-center mt-4">Your wishlist is empty.</div>;

  return (
    <div className="container-fluid mt-4 px-3">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          margin: 0,
          color: '#000'
        }}>Your Wishlist</h2>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{
            fontSize: '0.875rem',
            color: '#555',
            fontWeight: '400'
          }}>Wishlisted</span>
          
          <div style={{
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '4px',
            padding: '0.25rem 0.625rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            minWidth: '24px',
            textAlign: 'center'
          }}>{wishlistCount || wishlist.length}</div>
        </div>
      </div>
      
      <div className="row g-3">
        <div className="col-12">
          <div className="w-100" style={{ overflowX: "hidden" }}>
            <TemplateVerticalContainer templates={wishlist} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistView;