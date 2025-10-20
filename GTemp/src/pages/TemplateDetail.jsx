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
import { useAuth } from '../contexts/UserContext';

const TemplateDetail = () => {
  const { templateID } = useParams();
  const { user } = useAuth();
  const { templates, loading } = useTemplates();
  const { wishlist, toggleWishlist } = useWishlist();

  if (loading) return <div>Loading template...</div>;
  if (!templates) return <div>Templates not available</div>;

  const template = templates.find(t => t.templateID === Number(templateID));
  if (!template) return <div>Template not found</div>;

  const isWishlisted = wishlist.includes(template.templateID);

  return (
    <>
      <HeaderBar />

      <div className="template-detail-container">
        <div className="sidebar">
          <IconButton
            imgSrc={
              isWishlisted
                ? "https://www.svgrepo.com/show/535436/heart.svg"
                : "https://www.svgrepo.com/show/532473/heart.svg"
            }
            name={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            onClick={() => {
              if (!user) {
                alert("Please log in to use the wishlist.");
                return;
              }
              toggleWishlist(template.templateID);
            }}
            className={isWishlisted ? "wishlisted" : ""}
          />

          <IconButton
            imgSrc="https://www.svgrepo.com/show/532718/star-sharp.svg"
            name="Rate"
            onClick={() => undefined}
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
