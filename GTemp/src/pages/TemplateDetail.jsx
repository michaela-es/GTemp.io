import React from 'react';
import { useParams } from 'react-router-dom';
import IconButton from '../components/IconButton';
import '../styles/TemplateDetail.css';
import HeadingText from '../components/HeadingText';
import DescBox from '../components/DescBox';
import ActionButton from '../components/ActionButton';
import { DetailsBox } from '../components/DetailsBox';
import RatingBox from '../components/RatingBox';
import HeaderBar from '../components/HeaderBar';
import { useTemplates } from '../contexts/TemplatesContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
/**
 * TemplateDetail Component
 * Displays detailed information about a template, including
 * wishlist functionality that persists per user.
 */
const TemplateDetail = () => {
  const { templateID } = useParams(); // Get templateID from URL
  const { templates, loading } = useTemplates(); // Load templates data
  const { wishlist, isInWishlist, toggleWishlist, loadingWishlist } = useWishlist(); // Wishlist data and methods

  const templateIdNum = Number(templateID); // Ensure ID is a number

  const { currentUser } = useAuth(); 
  console.log('=== USER DEBUG ===');
  console.log('Full currentUser object:', currentUser);
  console.log('User ID:', currentUser?.id);
  console.log('All user keys:', currentUser ? Object.keys(currentUser) : 'No user');

  // Wait until both templates and wishlist are loaded
  if (loading || loadingWishlist) return <div>Loading template...</div>;
  if (!templates) return <div>Templates not available</div>;

  // Find the template by ID
const template = templates.find(t => Number(t.templateID) === templateIdNum);
  if (!template) return <div>Template not found</div>;

  // Debugging information for wishlist
  console.log('=== WISHLIST DEBUG ===');
  console.log('Template ID:', template.templateID, 'Type:', typeof template.templateID);
  console.log('Current wishlist:', wishlist);
  console.log('Is in wishlist:', isInWishlist(template.templateID));

  // Handles clicking the wishlist button
  const handleWishlistClick = () => {
    toggleWishlist(template.templateID);
  };

  return (
    <>
      <HeaderBar />

      <div className="template-detail-container">
        {/* Sidebar with Wishlist & Rate Buttons */}
        <div className="sidebar">
          <IconButton
            imgSrc={
              isInWishlist(template.templateID)
                ? 'https://www.svgrepo.com/show/535436/heart.svg' // Filled heart if in wishlist
                : 'https://www.svgrepo.com/show/532473/heart.svg' // Outline heart if not
            }
            name={isInWishlist(template.templateID) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            onClick={handleWishlistClick}
            className={isInWishlist(template.templateID) ? 'wishlisted' : ''}
          />

          <IconButton
            imgSrc="https://www.svgrepo.com/show/532718/star-sharp.svg"
            name="Rate"
          />
        </div>

        {/* Template Details Section */}
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
              />

              <HeadingText text="Download" />
              <section style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <ActionButton name="Download Now" />
                <p>Name your own price</p>
              </section>

              <HeadingText text="Comments" />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateDetail;
