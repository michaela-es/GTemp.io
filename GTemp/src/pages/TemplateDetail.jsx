import React from 'react';
import { useParams } from 'react-router-dom';
import IconButton from '../components/IconButton';
import '../styles/TemplateDetail.css';
import HeadingText from '../components/HeadingText';
import DescBox from '../components/DescBox';
import ActionButton from '../components/ActionButton';
import { DetailsBox } from '../components/DetailsBox';
import RatingBox from '../components/RatingBox';
import { useTemplates } from '../contexts/TemplatesContext';
import { useWishlist } from '../contexts/WishlistContext';
import HeaderBar from '../components/HeaderBar';
import CommentsList from '../components/CommentList';

const TemplateDetail = () => {
  const { templateID } = useParams();
  const { templates, loading } = useTemplates();
  const { isInWishlist, toggleWishlist, loadingWishlist } = useWishlist();

  if (!templateID) return <div>No template ID found</div>;

  const templateIdNum = Number(templateID);
  if (isNaN(templateIdNum)) return <div>Invalid template ID</div>;

  if (loading || loadingWishlist) return <div>Loading template...</div>;
  if (!templates || templates.length === 0) return <div>Templates not available</div>;

  const template = templates.find(t => Number(t.templateID) === templateIdNum);
  if (!template) return <div>Template not found</div>;

  const wishlisted = isInWishlist(template.templateID);
  const handleWishlistClick = () => toggleWishlist(template.templateID);

  return (
    <>
      <HeaderBar />

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
            className={wishlisted ? 'wishlisted' : ''}
          />

          <IconButton
            imgSrc="https://www.svgrepo.com/show/532718/star-sharp.svg"
            name="Rate"
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
                <ActionButton name="Download Now" />
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
    </>
  );
};

export default TemplateDetail;
