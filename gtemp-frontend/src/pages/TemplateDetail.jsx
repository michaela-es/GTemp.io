import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IconButton from '../components/IconButton';
import HeadingText from '../components/HeadingText';
import DescBox from '../components/Templates/DescBox';
import ActionButton from '../components/ActionButton';
import { DetailsBox } from '../components/Templates/DetailsBox';
import RatingBox from '../components/RatingBox';
import FirstContainer from '../components/display/Header';
import CommentsList from '../components/CommentList';
import DownloadModal from '../components/DownloadModal';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from "../context/AuthContext";
import '../styles/TemplateDetail.css';
const TemplateDetail = () => {
  const { id } = useParams();
  const templateId = Number(id);

  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const { currentUser, refreshWallet } = useAuth();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(templateId);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/templates/${templateId}`);
        if (!res.ok) throw new Error(`Failed to fetch template: ${res.status}`);
        const data = await res.json();
              console.log('Images array:', data.images);

        setTemplate(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplate();
  }, [templateId]);

  const getImageUrl = (path) => {
    if (!path) return '/default-cover.jpg';
    return `http://localhost:8080/${path.replace(/\\/g, '/')}`;
  };

  const handleConfirmPayment = async (amount) => {
    if (!currentUser) return alert("You must be logged in to purchase.");
    try {
      const res = await fetch(
        `http://localhost:8080/api/templates/${template.id}/purchase?userEmail=${encodeURIComponent(currentUser.email)}&donationAmount=${amount}`,
        { method: 'POST' }
      );
      if (!res.ok) return alert('Payment failed');
      alert('Payment successful!');
      handleFreeDownload();
      await refreshWallet();
      setShowDownloadModal(false);
    } catch (err) {
      console.error(err);
      alert('Payment failed');
    }
  };

  const handleFreeDownload = () => {
    if (!currentUser) return alert("You must be logged in to download.");
    const link = document.createElement('a');
    link.href = `http://localhost:8080/api/templates/${template.id}/download/free?userEmail=${encodeURIComponent(currentUser.email)}`;
    link.download = `${template.templateTitle}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadModal(false);
  };

  if (loading) return <div>Loading template...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!template) return <div>Template not found</div>;

  return (
    <div className="container">
      <FirstContainer />

      <div className="template-detail-container">
        <div className="sidebar">
          <IconButton
            imgSrc={inWishlist
              ? 'https://www.svgrepo.com/show/535436/heart.svg'
              : 'https://www.svgrepo.com/show/532473/heart.svg'}
            name={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            onClick={() => toggleWishlist(templateId)}
            className={inWishlist ? 'wishlisted' : ''}
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
              <CommentsList templateId={template.id} />
            </div>

            <div className="details-right">
              <img src={getImageUrl(template.coverImagePath)} alt={template.templateTitle} className="template-image" />
              <div className="rating-div">
                <HeadingText text="Rating" />
                <RatingBox templateRating={template.rating} />
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
  );
};

export default TemplateDetail;
