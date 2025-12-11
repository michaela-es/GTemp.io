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
  const [images, setImages] = useState([]);
  const [loadingTemplate, setLoadingTemplate] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const { currentUser } = useAuth();
  const { 
    toggleWishlist, 
    isInWishlist, 
    loading: wishlistLoading,
    error: wishlistError 
  } = useWishlist(); 

  // Fetch template data
  useEffect(() => {
    const fetchTemplateData = async () => {
      setLoadingTemplate(true);
      setError(null);
      try {
        const [templateData, imagesData] = await Promise.all([
          templateAPI.getTemplate(templateId),
          templateAPI.getTemplateImages(templateId),
        ]);
        setTemplate(templateData);
        setImages(imagesData);
      } catch (err) {
        handleFetchError(err);
      } finally {
        setLoadingTemplate(false);
      }
    };

    fetchTemplateData();
  }, [templateId]);

  // Handle fetch errors
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

  // Wishlist handling
  const wishlisted = templateId ? isInWishlist(templateId) : false;

  // Get image URL (handle path formatting)
  const getImageUrl = (path) => {
    if (!path) return '/default-cover.jpg';
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `http://localhost:8080/${cleanPath.replace(/\\/g, '/')}`;
  };

  // Handle wishlist toggle
  const handleWishlistToggle = async () => {
    if (!currentUser) {
      alert("You must be logged in to add to wishlist.");
      return;
    }

    try {
      const result = await toggleWishlist(templateId);
      if (!result.success) {
        alert(result.message || "Failed to update wishlist");
      }
    } catch (err) {
      console.error("Wishlist toggle error:", err);
      alert(err.message || "Failed to update wishlist");
    }
  };

  // Handle download click
  const handleDownloadClick = async () => {
    if (!currentUser) {
      alert("You must be logged in to download.");
      return;
    }

    if (!template) return;

    if (template.priceSetting === "No Payment") {
      await handleDownload(true);
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

  // Handle the download (either free or after payment)
  const handleDownload = async (isFree = false, amount = 0) => {
    if (!currentUser || !template) return;
    setDownloading(true);

    try {
      if (!isFree && (template.priceSetting === "Paid" || (template.priceSetting === "$0 or donation" && amount > 0))) {
        await handlePurchase(amount);
      }

      const response = await templateAPI.downloadTemplate(templateId); 
      const blob = response.data;  // Use Axios response.data for Blob
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${template.templateTitle.replace(/[^a-z0-9]/gi, '_')}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);

      setShowDownloadModal(false);
      alert(isFree ? 'Template downloaded successfully!' : `Thank you for your $${amount} donation!`);
      setTemplate(prev => ({ ...prev, downloads: (prev.downloads || 0) + 1 }));
    } catch (err) {
      console.error(err);
      alert(`Download failed: ${err.message || "An unexpected error occurred."}`);
    } finally {
      setDownloading(false);
    }
  };

  // Handle template purchase
  const handlePurchase = async (amount) => {
    try {
      return await templateAPI.purchaseTemplate(templateId, amount);
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Payment failed');
    }
  };

  // Check if the user has already purchased the template
  const checkIfPurchased = async () => {
    try {
      const libraryItems = await templateAPI.checkPurchase(); 
      return libraryItems.some(item => item.template.id === templateId && item.actionType === "PURCHASED");
    } catch (err) {
      console.error("Error checking purchase status:", err);
      return false; // Assume not purchased if the check fails
    }
  };

  // Format the release date of the template
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Check if the current user is the owner of the template
  const isTemplateOwner = currentUser?.userId === template?.templateOwner;
  const isPrivateTemplate = template?.visibility === false;

  // Loading and error states
  if (loadingTemplate) return <div>Loading template...</div>;
  if (error) return <div className="not-found">{error}</div>;
  if (isPrivateTemplate && !isTemplateOwner) return <NoAccess />;

  return (
    <BackgroundWrapper imageUrl={getImageUrl(template.coverImagePath)}>
      <Header />
      <div className="template-detail-container">
        <div className="sidebar">
          {!isTemplateOwner && (
            <IconButton
              imgSrc={wishlisted
                ? 'https://www.svgrepo.com/show/535436/heart.svg'
                : 'https://www.svgrepo.com/show/532473/heart.svg'}
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
                  {/* Add your star rating rendering logic here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDownloadModal && (
        <DownloadModal
          template={template}
          onClose={() => !downloading && setShowDownloadModal(false)}
          onConfirm={handleDownload}
          disabled={downloading}
        />
      )}
    </BackgroundWrapper>
  );
};

export default TemplateDetail2;
