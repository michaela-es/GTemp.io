import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IconButton from '../components/IconButton';
import HeadingText from '../components/HeadingText';
import DescBox from '../components/Templates/DescBox';
import ActionButton from '../components/ActionButton';
import { DetailsBox } from '../components/Templates/DetailsBox';
import FirstContainer from '../components/display/Header';
import CommentsList from '../components/CommentList';
import DownloadModal from '../components/DownloadModal';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from "../context/AuthContext";
import '../styles/TemplateDetail.css';
import BackgroundWrapper from '../components/Templates/BackgroundWrapper';
const TemplateDetail = () => {
  const { id } = useParams();
  const templateId = Number(id);

  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratedUsers, setRatedUsers] = useState([]);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const { currentUser, refreshWallet, initializing } = useAuth();
  const { toggleWishlist, isInWishlist, wishlistIds } = useWishlist();

  const inWishlist = wishlistIds.includes(templateId);


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
        if (!res.ok) throw new Error("Failed to fetch rated users");
        const data = await res.json();
        setRatedUsers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRatedUsers();
  }, [templateId]);


  const getImageUrl = (path) => {
    if (!path) return '/default-cover.jpg';
    return `http://localhost:8080/${path.replace(/\\/g, '/')}`;
  };


  const handleWishlistClick = async () => {
    if (!currentUser) {
      alert("You must be logged in to add to wishlist.");
      return;
    }
    await toggleWishlist(templateId);
  };

  const handleFreeDownload = () => {
    if (!currentUser) {
      alert("You must be logged in to download.");
      return;
    }
    const link = document.createElement('a');
    link.href = `http://localhost:8080/api/templates/${templateId}/download/free?userEmail=${encodeURIComponent(currentUser.email)}`;
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
      const res = await fetch(
        `http://localhost:8080/api/templates/${templateId}/purchase?userEmail=${encodeURIComponent(currentUser.email)}&donationAmount=${amount}`,
        { method: 'POST' }
      );
      if (!res.ok) {
        const error = await res.text();
        alert(`Payment failed: ${error}`);
        return;
      }
      alert('Payment successful!');
      handleFreeDownload();
      await refreshWallet();
      setShowDownloadModal(false);
    } catch (err) {
      console.error(err);
      alert('Payment failed. Try again.');
    }
  };

  if (loading) return <div>Loading template...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!template) return <div>Template not found</div>;

  return (
    <BackgroundWrapper imageUrl={getImageUrl(template.coverImagePath)}>
    <div className="container">
      <FirstContainer />

      <div className="template-detail-container">
        <div className="sidebar">
          <IconButton
            imgSrc={inWishlist
              ? 'https://www.svgrepo.com/show/535436/heart.svg'
              : 'https://www.svgrepo.com/show/532473/heart.svg'}
            name={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            onClick={handleWishlistClick}
            className={inWishlist ? 'wishlisted' : ''}
            disabled={!currentUser || initializing}
          />
          <IconButton
            imgSrc="https://www.svgrepo.com/show/532718/star-sharp.svg"
            name="Rate"
          />
        </div>

        <div className="details">
          <div className="details-grid">
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
                    if (template.priceSetting === "No Payment") handleFreeDownload();
                    else setShowDownloadModal(true);
                  }}
                />
                {template.priceSetting === "₱0 or donation" && <p>Name your own price</p>}
              </section>

              <HeadingText text="Comments" />
              <CommentsList templateId={templateId} />
            </div>

            <div className="details-right">
              <img
                src={getImageUrl(template.coverImagePath)}
                alt={template.templateTitle}
                className="template-image"
              />

              <div className="rating-div">
                <HeadingText text="Rating" />
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

      {showDownloadModal && (
        <DownloadModal
          template={template}
          onClose={() => setShowDownloadModal(false)}
          onConfirm={handleConfirmPayment}
          onFreeDownload={handleFreeDownload}
        />
      )}
     </div>
    </BackgroundWrapper>
  );
};

export default TemplateDetail;
