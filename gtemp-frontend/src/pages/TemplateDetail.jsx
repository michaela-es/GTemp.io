import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IconButton from '../components/IconButton';
import HeadingText from '../components/HeadingText';
import DescBox from '../components/Templates/DescBox';
import ActionButton from '../components/ActionButton';
import { DetailsBox } from '../components/Templates/DetailsBox';
import Header from '../components/display/Header';
import CommentsList from '../components/CommentList';
import DownloadModal from '../components/DownloadModal';
import RatingBox from '../components/RatingBox';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from "../context/AuthContext";
import BackgroundWrapper from '../components/Templates/BackgroundWrapper';
import '../styles/TemplateDetail.css';

const TemplateDetail = () => {
  const { id } = useParams();
  const templateId = Number(id);

  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratedUsers, setRatedUsers] = useState([]);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const { currentUser, refreshWallet } = useAuth();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Fetch template data
  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/templates/${templateId}`);
        if (!res.ok) throw new Error(`Failed to fetch template: ${res.status}`);
        const data = await res.json();
        setTemplate(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplate();
  }, [templateId]);

  // Fetch rated users
  useEffect(() => {
    const fetchRatedUsers = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/templates/${templateId}/rated-users`);
        if (res.ok) {
          const data = await res.json();
          setRatedUsers(data);
        }
      } catch (err) {
        console.error("Failed to fetch rated users:", err);
      }
    };
    if (templateId) fetchRatedUsers();
  }, [templateId]);

  // Check if in wishlist
  const wishlisted = templateId ? isInWishlist(templateId) : false;

  // Get image URL helper
  const getImageUrl = (path) => {
    if (!path) return '/default-cover.jpg';
    // Remove any leading slash if present
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `http://localhost:8080/${cleanPath.replace(/\\/g, '/')}`;
  };

  // Handle wishlist toggle
  const handleWishlistClick = async () => {
    if (!currentUser) {
      alert("You must be logged in to add to wishlist.");
      return;
    }
    
    setWishlistLoading(true);
    try {
      await toggleWishlist(templateId);
    } catch (err) {
      console.error("Wishlist toggle error:", err);
      alert("Failed to update wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  // Handle free download
  const handleFreeDownload = () => {
    if (!currentUser) {
      alert("You must be logged in to download.");
      return;
    }
    
    const link = document.createElement('a');
    link.href = `http://localhost:8080/api/templates/${templateId}/download/free?userID=${encodeURIComponent(currentUser.userID)}`;
    link.download = `${template.templateTitle}.zip`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadModal(false);
  };

  // Handle payment confirmation
  const handleConfirmPayment = async (amount) => {
    if (!currentUser) {
      alert("You must be logged in to purchase.");
      return;
    }
    
    try {
      const url = `http://localhost:8080/api/templates/${templateId}/purchase?userEmail=${encodeURIComponent(currentUser.email)}${amount > 0 ? `&donationAmount=${amount}` : ''}`;
      
      const res = await fetch(url, { method: 'POST' });
      
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Payment failed: ${errorData.error || errorData.message || 'Unknown error'}`);
        return;
      }
      
      const result = await res.json();
      alert(result.message || 'Payment successful!');
      
      // If already owned, still allow download
      if (result.alreadyOwned || !result.alreadyOwned) {
        handleFreeDownload();
      }
      
      await refreshWallet();
      setShowDownloadModal(false);
    } catch (err) {
      console.error('Payment error:', err);
      alert('Payment failed. Try again.');
    }
  };

  // Handle download button click
  const handleDownloadClick = () => {
    if (!currentUser) {
      alert("You must be logged in to download.");
      return;
    }

    if (template.priceSetting === "No Payment") {
      handleFreeDownload();
    } else {
      setShowDownloadModal(true);
    }
  };

  // Loading and error states
  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading template...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <h2>Error loading template</h2>
      <p>{error}</p>
    </div>
  );
  
  if (!template) return <div className="not-found">Template not found</div>;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Generate star rating display
  const renderStars = (rating) => {
    if (!rating) return 'No rating yet';
    
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    return (
      <span className="star-rating">
        {'★'.repeat(fullStars)}
        {halfStar ? '⯨' : ''}
        {'☆'.repeat(emptyStars)}
        <span className="rating-number"> ({rating.toFixed(1)})</span>
      </span>
    );
  };

  return (
    <BackgroundWrapper imageUrl={getImageUrl(template.coverImagePath)}>
      <Header />
      
      <div className="template-detail-container">
        <div className="sidebar">
          <IconButton
            imgSrc={
              wishlisted
                ? 'https://www.svgrepo.com/show/535436/heart.svg'
                : 'https://www.svgrepo.com/show/532473/heart.svg'
            }
            name={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            onClick={handleWishlistClick}
            className={`wishlist-btn ${wishlisted ? 'wishlisted' : ''} ${wishlistLoading ? 'loading' : ''}`}
            disabled={!currentUser || wishlistLoading}
          />
          
          <IconButton
            imgSrc="https://www.svgrepo.com/show/532718/star-sharp.svg"
            name="Rate"
            onClick={() => {
              if (!currentUser) {
                alert("You must be logged in to rate.");
                return;
              }
              // Implement rating modal or redirect
              alert("Rating feature coming soon!");
            }}
          />
        </div>

        <div className="details">
          <div className="details-grid">
            <div className="details-left">
              <HeadingText text={template.templateTitle} />
              
              <DescBox text={template.templateDesc} />
              
              <DetailsBox
                releaseDate={formatDate(template.releaseDate)}
                engine={template.engine}
                templateOwnerUsername={template.templateOwnerUsername || template.templateOwner}
                type={template.type}
              />
              
              <HeadingText text="Download" />
              <section className="download-section">
                <ActionButton
                  name="Download Now"
                  onClick={handleDownloadClick}
                  disabled={!currentUser}
                />
                <div className="price-info">
                  {template.priceSetting === "No Payment" && <span>Free</span>}
                  {template.priceSetting === "₱0 or donation" && <span>Name your own price</span>}
                  {template.priceSetting === "Paid" && <span>₱{template.price?.toFixed(2) || '0.00'}</span>}
                </div>
              </section>
              
              <HeadingText text="Comments" />
              <CommentsList templateId={templateId} />
            </div>

            <div className="details-right">
              <img
                src={getImageUrl(template.coverImagePath)}
                alt={template.templateTitle}
                className="template-image"
                onError={(e) => {
                  e.target.src = '/default-cover.jpg';
                }}
              />
              
              <div className="rating-div">
                <HeadingText text="Rating" />
                
                <div className="rating-display">
                  {renderStars(template.averageRating)}
                  <p className="rating-count">
                    {ratedUsers.length} {ratedUsers.length === 1 ? 'rating' : 'ratings'}
                  </p>
                </div>
                
                <div className="downloads-count">
                  <HeadingText text="Downloads" />
                  <p>{template.downloads || 0} downloads</p>
                </div>
                
                {ratedUsers.length > 0 && (
                  <div className="rated-users">
                    <h3>Recent Ratings:</h3>
                    <ul>
                      {ratedUsers.slice(0, 5).map((user, index) => (
                        <li key={index} className="rated-user">
                          <span className="user-name">{user.userName || user.userEmail}</span>
                          <span className="user-rating">{user.ratingValue}★</span>
                        </li>
                      ))}
                    </ul>
                    {ratedUsers.length > 5 && (
                      <p className="more-ratings">+ {ratedUsers.length - 5} more ratings</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDownloadModal && (
        <DownloadModal
          template={template}
          userEmail={currentUser?.email}
          onClose={() => setShowDownloadModal(false)}
          onConfirm={handleConfirmPayment}
          onFreeDownload={handleFreeDownload}
        />
      )}
    </BackgroundWrapper>
  );
};

export default TemplateDetail;