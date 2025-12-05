// TemplateDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IconButton from '../components/IconButton';
import HeadingText from '../components/HeadingText';
import DescBox from '../components/DescBox';
import ActionButton from '../components/ActionButton';
import { DetailsBox } from '../components/DetailsBox';
import RatingBox from '../components/RatingBox';
import FirstContainer from '../components/display/Header';
import CommentsList from '../components/CommentList';
import DownloadModal from '../components/DownloadModal';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from "../context/AuthContext";
import '../styles/TemplateDetail.css';

const TemplateDetail = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratedUsers, setRatedUsers] = useState([]);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const { currentUser, refreshWallet } = useAuth();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(id);

  useEffect(() => {
    if (currentUser) {
      refreshWallet();
    }
  }, [currentUser, refreshWallet]);


  // -------------------------
  // Handlers
  // -------------------------
  const handleWishlistClick = async () => {
    await toggleWishlist(id);
  };

  const handleFreeDownload = () => {
    if (!currentUser) {
      alert("You must be logged in to download.");
      return;
    }

    const link = document.createElement('a');
    link.href = `http://localhost:8080/api/templates/${template.id}/download/free?userEmail=${encodeURIComponent(currentUser.email)}`;
    link.download = `${template.templateTitle}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadModal(false);
  };

  const handleConfirmPayment = async (amount) => {
    if (!currentUser) {
      alert("You must be logged in to purchase.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/templates/${template.id}/purchase?userEmail=${encodeURIComponent(currentUser.email)}&donationAmount=${amount}`,
        { method: 'POST' }
      );

      if (!response.ok) {
        const error = await response.text();
        alert(`Payment failed: ${error}`);
        return;
      }

      alert('Payment successful!');
      handleFreeDownload(); // Automatically download after payment
      await refreshWallet();
      setShowDownloadModal(false);

    } catch (err) {
      console.error(err);
      alert('Payment failed. Try again.');
    }
  };

  // -------------------------
  // Helper functions
  // -------------------------
  const getImageUrl = (path) => {
    if (!path) return '/default-cover.jpg';
    const cleanPath = path.replace(/\\/g, '/');
    return `http://localhost:8080/${cleanPath}`;
  };

  // -------------------------
  // Fetch template
  // -------------------------
  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        console.log('Fetching template with ID:', id);
        const response = await fetch(`http://localhost:8080/api/templates/${id}`);
        if (!response.ok) throw new Error(`Failed to fetch template: ${response.status}`);
        const templateData = await response.json();
        console.log('Template data received:', templateData);
        setTemplate(templateData);
      } catch (err) {
        console.error('Error fetching template:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id]);

  // -------------------------
  // Fetch rated users
  // -------------------------
  useEffect(() => {
    const fetchRatedUsers = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/templates/${id}/rated-users`);
        if (!res.ok) throw new Error("Failed to fetch rated users");
        const data = await res.json();
        setRatedUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRatedUsers();
  }, [id]);

  // -------------------------
  // Render Loading/Error states
  // -------------------------
  if (loading) return <div>Loading template...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!template) return <div>Template not found</div>;

  // -------------------------
  // JSX
  // -------------------------
  return (
    <div className="container">
      <FirstContainer />

      <div className="template-detail-container">
        {/* Sidebar */}
        <div className="sidebar">
          <IconButton
            imgSrc={inWishlist
              ? 'https://www.svgrepo.com/show/535436/heart.svg'
              : 'https://www.svgrepo.com/show/532473/heart.svg'}
            name={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            onClick={handleWishlistClick}
            className={inWishlist ? 'wishlisted' : ''}
          />
          <IconButton
            imgSrc="https://www.svgrepo.com/show/532718/star-sharp.svg"
            name="Rate"
          />
        </div>

        {/* Details */}
        <div className="details">
          <div className="details-grid">

            {/* Left Column */}
            <div className="details-left">
              <HeadingText text={template.templateTitle} />
              <DescBox text={template.templateDesc} />

              <DetailsBox
                releaseDate={template.releaseDate ? new Date(template.releaseDate).toLocaleDateString() : 'Not specified'}
                engine={template.engine}
                templateOwner={template.templateOwner}
                type={template.type}
              />

              <HeadingText text="Download" />
              <section style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <ActionButton
                  name="Download Now"
                  onClick={() => {
                    if (template.priceSetting === "No Payment") {
                      handleFreeDownload();
                    } else {
                      setShowDownloadModal(true);
                    }
                  }}
                />
                {template.priceSetting === "₱0 or donation" && <p>Name your own price</p>}
              </section>

              <HeadingText text="Comments" />
              <div style={{ marginTop: '1rem' }}>
                <CommentsList templateId={template.id} />
              </div>
            </div>

            {/* Right Column */}
            <div className="details-right">
              <img
                src={getImageUrl(template.coverImagePath)}
                alt={template.templateTitle}
                className="template-image"
              />

              <div className="rating-div">
                <HeadingText text="Rating" />

                {/* Average Rating */}
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {template.averageRating
                    ? (() => {
                        const fullStars = Math.floor(template.averageRating);
                        const halfStar = template.averageRating - fullStars >= 0.5 ? 1 : 0;
                        const emptyStars = 5 - fullStars - halfStar;
                        return (
                          '★'.repeat(fullStars) +
                          (halfStar ? '⯨' : '') +
                          '☆'.repeat(emptyStars)
                        );
                      })()
                    : 'No rating yet'}
                </p>

                {/* Rated Users */}
                <div>
                  <h3>Users who rated this template:</h3>
                  {ratedUsers.length === 0 ? (
                    <p>No ratings yet.</p>
                  ) : (
                    <ul>
                      {ratedUsers.map(user => (
                        <li key={user.userEmail}>
                          {user.userName} ({user.userEmail}): {user.ratingValue}★
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <DownloadModal
          template={template}
          onClose={() => setShowDownloadModal(false)}
          onConfirm={handleConfirmPayment}
          onFreeDownload={handleFreeDownload}
        />
      )}
    </div>
  );
};

export default TemplateDetail;
