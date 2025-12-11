import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from "../context/AuthContext";
import { templateAPI } from '../services/templateAPI';
import Header from '../components/display/Header';
import IconButton from '../components/IconButton';
import HeadingText from '../components/HeadingText';
import DescBox from '../components/Templates/DescBox';
import ActionButton from '../components/ActionButton';
import { DetailsBox } from '../components/Templates/DetailsBox';
import CommentsList from '../components/CommentList';
import DownloadModal from '../components/DownloadModal';
import BackgroundWrapper from '../components/Templates/BackgroundWrapper';
import ImageCarousel from '../components/Templates/ImageCarousel';
import NoAccess from '../components/Templates/NoAcess';
import '../styles/TemplateDetail.css';

const TemplateDetail2 = () => {
  const { id } = useParams();
  const templateId = Number(id);

  const [template, setTemplate] = useState(null);
  const [ratedUsers, setRatedUsers] = useState([]);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [images, setImages] = useState([]);

  const { currentUser } = useAuth();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Fetch all template data
  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const [templateData, imagesData, ratedUsersData] = await Promise.all([
          templateAPI.getTemplate(templateId),
          templateAPI.getTemplateImages(templateId),
          templateAPI.getTemplateRatedUsers(templateId)
        ]);
        
        setTemplate(templateData);
        setImages(imagesData);
        setRatedUsers(ratedUsersData);
      } catch (err) {
        handleFetchError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplateData();
  }, [templateId]);

  const handleFetchError = (err) => {
    console.error('Error fetching template:', err);
    
    if (err.response?.status === 403) {
      setError("This template is private. Only the owner can view it.");
    } else if (err.response?.status === 404) {
      setError("Template not found");
    } else {
      setError(err.message || "Failed to load template");
    }
  };

  const wishlisted = templateId ? isInWishlist(templateId) : false;

  const getImageUrl = (path) => {
    if (!path) return '/default-cover.jpg';
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `http://localhost:8080/${cleanPath.replace(/\\/g, '/')}`;
  };

  const handleWishlistToggle = async () => {
    if (!currentUser) {
      alert("You must be logged in to add to wishlist.");
      return;
    }
    
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

  const handleDownload = async (isFree = false, amount = 0) => {
    if (!currentUser || !template) return;
    
    setDownloading(true);
    try {
      if (!isFree && (template.priceSetting === "Paid" || (template.priceSetting === "$0 or donation" && amount > 0))) {
        await handlePurchase(amount);
      }

      await downloadTemplateFile();
      
      updateTemplateDownloads();
      setShowDownloadModal(false);
      showDownloadSuccessMessage(isFree, amount);
    } catch (err) {
      console.error(err);
      alert(`Download failed: ${err.message}`);
    } finally {
      setDownloading(false);
    }
  };

  const handlePurchase = async (amount) => {
    try {
      return await templateAPI.purchaseTemplate(templateId, currentUser.userId, amount);
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Payment failed');
    }
  };

  const downloadTemplateFile = async () => {
    const response = await templateAPI.downloadTemplate(templateId, currentUser.userId);
    const blob = await response.blob();
    
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${template.templateTitle.replace(/[^a-z0-9]/gi, '_')}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  };

  const updateTemplateDownloads = () => {
    setTemplate(prev => ({
      ...prev,
      downloads: (prev.downloads || 0) + 1
    }));
  };

  const showDownloadSuccessMessage = (isFree, amount) => {
    if (isFree) {
      alert('Template downloaded successfully!');
    } else if (amount > 0) {
      alert(`Thank you for your $${amount} donation! Template downloaded.`);
    }
  };

  const handleFreeDownload = async () => {
    if (!currentUser) {
      alert('Please login first');
      return;
    }
    await handleDownload(true);
  };

  const handleConfirmPayment = async (amount) => {
    await handleDownload(false, amount);
  };

  const handleDownloadClick = async () => {
    if (!currentUser) {
      alert("You must be logged in to download.");
      return;
    }

    if (template.priceSetting === "No Payment") {
      await handleFreeDownload();
      return;
    }

    if (template.priceSetting === "Paid") {
      try {
        const hasPurchased = await checkIfPurchased();
        if (hasPurchased) {
          await handleDownload();
          return;
        }
      } catch (err) {
        console.error(err);
        alert("Failed to check purchase status.");
        return;
      }
    }

    setShowDownloadModal(true);
  };

  const checkIfPurchased = async () => {
    const libraryItems = await templateAPI.checkPurchase(currentUser.userId);
    return libraryItems.some(
      item => item.template.id === templateId && item.actionType === "PURCHASED"
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderStarRating = (rating) => {
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

  const isTemplateOwner = currentUser?.userId === template?.templateOwner;
  const isPrivateTemplate = template?.visibility === false;

  // Render not found state
  if (!template) {
    return <div className="not-found">Template not found</div>;
  }

  // Check access for private templates
  if (isPrivateTemplate && !isTemplateOwner) {
    return <NoAccess />;
  }

  // Main render
  return (
    <BackgroundWrapper imageUrl={getImageUrl(template.coverImagePath)}>
      <Header />
      <div className="template-detail-container">
        <div className="sidebar">
          {!isTemplateOwner && (
            <IconButton
              imgSrc={wishlisted
                ? 'https://www.svgrepo.com/show/535436/heart.svg'
                : 'https://www.svgrepo.com/show/532473/heart.svg'
              }
              name={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              onClick={handleWishlistToggle}
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
                  {template.priceSetting === "$0 or donation" && <span>Name your own price</span>}
                  {template.priceSetting === "Paid" && <span>${template.price?.toFixed(2) || '0.00'}</span>}
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
                  {renderStarRating(template.averageRating)}
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