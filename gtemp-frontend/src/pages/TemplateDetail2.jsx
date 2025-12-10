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
import BackgroundWrapper from '../components/Templates/BackgroundWrapper';
import ImageCarousel from '../components/Templates/ImageCarousel';
import NoAccess from '../components/Templates/NoAcess';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from "../context/AuthContext";
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
  const [images, setImages] = useState([]);

  const { currentUser, refreshWallet } = useAuth();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Fetch template details
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
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/templates/${templateId}/images`);
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      } else {
        console.error("Error fetching images");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

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

  Promise.all([fetchTemplate(), fetchImages(), fetchRatedUsers()])
    .then(() => setLoading(false));  
}, [templateId]);

  

  const wishlisted = templateId ? isInWishlist(templateId) : false;

  const getImageUrl = (path) => {
    if (!path) return '/default-cover.jpg';
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `http://localhost:8080/${cleanPath.replace(/\\/g, '/')}`;
  };

  const handleWishlistClick = async () => {
    if (!currentUser) return alert("You must be logged in to add to wishlist.");
    setWishlistLoading(true);
    try {
      await toggleWishlist(templateId);
    } catch (err) {
      console.error(err);
      alert("Failed to update wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  // Download function for free templates or after purchase/donation
  const downloadFile = async (isFree = false, amount = 0) => {
    if (!currentUser || !template) return;
    setDownloading(true);
    try {
      // Handle payments if required
      if (!isFree && (template.priceSetting === "Paid" || (template.priceSetting === "₱0 or donation" && amount > 0))) {
        await handlePurchasePayment(amount);
      }

      const downloadUrl = `http://localhost:8080/api/templates/${templateId}/download/free?userID=${currentUser.userID}`;
      const res = await fetch(downloadUrl);
      if (!res.ok) throw new Error(`Download failed: ${res.status}`);
      const blob = await res.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${template.templateTitle.replace(/[^a-z0-9]/gi, '_')}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);

      setTemplate(prev => ({
        ...prev,
        downloads: (prev.downloads || 0) + 1
      }));

      setShowDownloadModal(false);
      if (isFree) alert('Template downloaded successfully!');
      else if (amount > 0) alert(`Thank you for your ₱${amount} donation! Template downloaded.`);

      await refreshWallet();
    } catch (err) {
      console.error(err);
      alert(`Download failed: ${err.message}`);
    } finally {
      setDownloading(false);
    }
  };

  // Purchase payment
  const handlePurchasePayment = async (amount) => {
    const params = new URLSearchParams({
      userID: currentUser.userID,
      ...(amount > 0 ? { donationAmount: amount } : {})
    });
    const res = await fetch(`http://localhost:8080/api/templates/${templateId}/purchase?${params}`, { method: 'POST' });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Payment failed');
    return result;
  };

  const handleFreeDownload = async () => {
    if (!currentUser) return alert('Please login first');
    await downloadFile(true);
  };

  // Confirm payment callback from modal
  const handleConfirmPayment = async (amount) => {
    await downloadFile(false, amount);
  };

  // Main download click handler
  const handleDownloadClick = async () => {
    if (!currentUser) return alert("You must be logged in to download.");

    if (template.priceSetting === "No Payment") {
      await handleFreeDownload();
      return;
    }

    if (template.priceSetting === "Paid") {
      try {
        // Check if already purchased
        const res = await fetch(
          `http://localhost:8080/api/templates/user/${currentUser.userID}/library`
        );
        const libraryItems = await res.json();
        const alreadyPurchased = libraryItems.some(
          item => item.template.id === templateId && item.actionType === "PURCHASED"
        );

        if (alreadyPurchased) {
          // Direct download if purchased
          await downloadFile();
          return;
        }
      } catch (err) {
        console.error(err);
        alert("Failed to check purchase status.");
        return;
      }
    }

    // Show modal for payment or donation
    setShowDownloadModal(true);
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
  
  if (template.visibility === false) {
      const isOwner = currentUser?.userID === template.templateOwner;
      if (!isOwner) {
        return <NoAccess />;
      }
  }


  const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not specified';

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
          {currentUser?.userID !== template.templateOwner && (
            <IconButton
              imgSrc={wishlisted
                ? 'https://www.svgrepo.com/show/535436/heart.svg'
                : 'https://www.svgrepo.com/show/532473/heart.svg'
              }
              name={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              onClick={handleWishlistClick}
              className={`wishlist-btn ${wishlisted ? 'wishlisted' : ''} ${wishlistLoading ? 'loading' : ''}`}
              disabled={!currentUser || wishlistLoading}
            />
          )}
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
              <ImageCarousel images={images} />
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
                  <p>{template.downloadCount || 0} downloads</p>
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
                    {ratedUsers.length > 5 && <p className="more-ratings">+ {ratedUsers.length - 5} more ratings</p>}
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
