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

const TemplateDetail2 = () => {
  const { id } = useParams();
  const templateId = Number(id);

  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratedUsers, setRatedUsers] = useState([]);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const { currentUser, refreshWallet } = useAuth();
  const { toggleWishlist, isInWishlist } = useWishlist();

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

  const wishlisted = templateId ? isInWishlist(templateId) : false;

  const getImageUrl = (path) => {
    if (!path) return '/default-cover.jpg';
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `http://localhost:8080/${cleanPath.replace(/\\/g, '/')}`;
  };

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

  const downloadFile = async (isFree = false, amount = 0) => {
    if (!currentUser || !template) return;
    
    setDownloading(true);
    
    try {
      if (!isFree && template.priceSetting === "Paid") {
        await handlePurchasePayment(amount);
      }
      
      if (!isFree && template.priceSetting === "₱0 or donation" && amount > 0) {
        await handlePurchasePayment(amount);
      }
      
      const downloadUrl = `http://localhost:8080/api/templates/${templateId}/download/free?userEmail=${encodeURIComponent(currentUser.email)}`;
      
      const response = await fetch(downloadUrl);
      
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Payment required to download this template');
        }
        if (response.status === 404) {
          throw new Error('Template file not found');
        }
        throw new Error(`Download failed with status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${template.templateTitle.replace(/[^a-z0-9]/gi, '_')}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setTemplate(prev => ({
        ...prev,
        downloads: (prev.downloads || 0) + 1
      }));
      
      setShowDownloadModal(false);
      
      if (isFree) {
        alert('Template downloaded successfully!');
      } else if (amount > 0) {
        alert(`Thank you for your ₱${amount} donation! Template downloaded.`);
      }
      
      await refreshWallet();
      
    } catch (error) {
      console.error('Download error:', error);
      alert(`Download failed: ${error.message}`);
    } finally {
      setDownloading(false);
    }
  };

  const handlePurchasePayment = async (amount) => {
    try {
      const url = `http://localhost:8080/api/templates/${templateId}/purchase?userEmail=${encodeURIComponent(currentUser.email)}${amount > 0 ? `&donationAmount=${amount}` : ''}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        if (response.status === 400 && result.includes('Insufficient wallet balance')) {
          throw new Error('Insufficient wallet balance. Please add funds to your wallet.');
        }
        throw new Error(result.message || result.error || 'Payment failed');
      }
      
      if (result.alreadyOwned) {
        console.log('Already owns this template');
      }
      
      return result;
    } catch (error) {
      console.error('Payment error:', error);
      throw error;
    }
  };

const handleConfirmPayment = async (amount) => {
  if (!currentUser) {
    alert('Please login first');
    return;
  }
  
  try {
    const params = new URLSearchParams({
      userEmail: currentUser.email,
      ...(amount > 0 ? { donationAmount: amount } : {})
    });
    
    const response = await fetch(
      `http://localhost:8080/api/templates/${template.id}/purchase?${params}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || result.error || `Payment failed with status ${response.status}`);
    }
    
    await handleDownload();
    
    await refreshWallet();
    
    return result;
    
  } catch (error) {
    throw error;
  }
};

const handleFreeDownload = async () => {
  if (!currentUser) {
    alert('Please login first');
    return;
  }
  
  try {
    const link = document.createElement('a');
    link.href = `http://localhost:8080/api/templates/${templateId}/download/free?userEmail=${encodeURIComponent(currentUser.email)}`;
    link.download = `${template.templateTitle}.zip`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true; 
    
  } catch (error) {
    throw error;
  }
};

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

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
                  name={downloading ? 'Downloading...' : 'Download Now'}
                  onClick={handleDownloadClick}
                  disabled={!currentUser || downloading}
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
          onClose={() => !downloading && setShowDownloadModal(false)}
          onConfirm={handleConfirmPayment}
          onFreeDownload={handleFreeDownload}
          disabled={downloading}
        />
      )}
    </BackgroundWrapper>
  );
};

export default TemplateDetail2;