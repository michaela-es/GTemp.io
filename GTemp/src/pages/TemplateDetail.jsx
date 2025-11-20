import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import IconButton from '../components/IconButton';
import '../styles/TemplateDetail.css';
import HeadingText from '../components/HeadingText';
import DescBox from '../components/DescBox';
import ActionButton from '../components/ActionButton';
import { DetailsBox } from '../components/DetailsBox';
import RatingBox from '../components/RatingBox';
import Star from '../components/star';
import { useTemplates } from '../contexts/TemplatesContext';
import { useWishlist } from '../contexts/WishlistContext';
import HeaderBar from '../components/HeaderBar';
import CommentsList from '../components/CommentList';

const TemplateDetail = () => {
  const { templateID } = useParams();
  const { templates, loading, setTemplates } = useTemplates();
  const { isInWishlist, toggleWishlist, loadingWishlist } = useWishlist();

  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [showRatingWindow, setShowRatingWindow] = useState(false);

  // Rating popup states
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  if (!templateID) return <div>No template ID found</div>;

  const templateIdNum = Number(templateID);
  if (isNaN(templateIdNum)) return <div>Invalid template ID</div>;
  if (loading || loadingWishlist) return <div>Loading template...</div>;
  if (!templates || templates.length === 0) return <div>Templates not available</div>;

  const template = templates.find(t => Number(t.templateID) === templateIdNum);
  if (!template) return <div>Template not found</div>;

  const wishlisted = isInWishlist(template.templateID);
  const handleWishlistClick = () => toggleWishlist(template.templateID);

  const handleDownloadClick = () => setHasDownloaded(true);
  const handleRateClick = () => setShowRatingWindow(true);
  const closeRateWindow = () => setShowRatingWindow(false);

  const handleRatingSubmit = () => {
    if (!selectedRating) {
      alert("Please select a rating.");
      return;
    }

    const updatedTemplates = templates.map(t =>
      t.templateID === templateIdNum ? { ...t, templateRating: selectedRating } : t
    );

    setTemplates(updatedTemplates);
    alert("Thank you for rating!");
    setShowRatingWindow(false);
  };

  return (
    <>
      <HeaderBar />

      <div className="template-detail-container">
        <div className="sidebar">
          <IconButton
            imgSrc={wishlisted ? 'https://www.svgrepo.com/show/535436/heart.svg' : 'https://www.svgrepo.com/show/532473/heart.svg'}
            name={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            onClick={handleWishlistClick}
            className={wishlisted ? 'wishlisted' : ''}
          />
          <IconButton
            imgSrc="https://www.svgrepo.com/show/532718/star-sharp.svg"
            name="Rate"
            onClick={handleRateClick}
          />
        </div>

        <div className="details">
          <div className="details-grid">
            <div className="details-left">
              <HeadingText text={template.templateName} />
              <DescBox text={template.templateDesc} />
              <DetailsBox
                releaseDate={template.releaseDate}
                category={template.category}
                templateOwner={template.templateOwner}
                genre={template.genre}
                engine={template.engine_type}
                type={template.template_type}
              />

              <HeadingText text="Download" />
              <section style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {!hasDownloaded ? (
                  <ActionButton name="Download Now" onClick={handleDownloadClick} />
                ) : (
                  <ActionButton name="Rate" onClick={handleRateClick} />
                )}
                <p>{template.price === 0 ? 'Free' : `$${template.price}`}</p>
              </section>

              <HeadingText text="Comments" />
              <div style={{ marginTop: '1rem' }}>
                <CommentsList templateId={templateIdNum} />
              </div>
            </div>

            <div className="details-right">
              <img
                src={template.templateImg}
                alt={template.templateName}
                className="template-image"
              />
              <div className="rating-div">
                <HeadingText text="Rating" />
                <RatingBox templateRating={template.templateRating} />
                <div style={{ marginTop: '1rem' }}>
                  <HeadingText text="Downloads" />
                  <p>{template.templateDls} downloads</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Popup */}
      {showRatingWindow && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Rate this template</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center", // <-- center the stars horizontally
                gap: "4px",
                marginBottom: "1rem"
              }}
            >
              {[1, 2, 3, 4, 5].map(star => (
                <div
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setSelectedRating(star)}
                >
                  <Star filled={star <= (hoverRating || selectedRating)} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button onClick={handleRatingSubmit}>Submit</button>
              <button onClick={closeRateWindow}>Close</button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default TemplateDetail;
