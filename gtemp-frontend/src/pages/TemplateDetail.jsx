import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IconButton from '../components/IconButton';
import '../styles/TemplateDetail.css';
import HeadingText from '../components/HeadingText';
import DescBox from '../components/DescBox';
import ActionButton from '../components/ActionButton';
import { DetailsBox } from '../components/DetailsBox';
import RatingBox from '../components/RatingBox';
import FirstContainer from '../components/display/Header';
const TemplateDetail = () => {
  const { id } = useParams(); 
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        console.log('Fetching template with ID:', id);
        const response = await fetch(`http://localhost:8080/api/templates/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch template: ${response.status}`);
        }
        
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

  const getImageUrl = (path) => {
    if (!path) return '/default-cover.jpg';
    const cleanPath = path.replace(/\\/g, '/');
    return `http://localhost:8080/${cleanPath}`;
  };

  if (loading) return <div>Loading template...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!template) return <div>Template not found</div>;

  const isInWishlist = false;
  const toggleWishlist = () => console.log('Wishlist toggled');

  const handleWishlistClick = () => {
    toggleWishlist(template.id);
  };

  return (
    <>
      <FirstContainer />

      <div className="template-detail-container">
        <div className="sidebar">
          <IconButton
            imgSrc={
              isInWishlist
                ? 'https://www.svgrepo.com/show/535436/heart.svg' 
                : 'https://www.svgrepo.com/show/532473/heart.svg' 
            }
            name={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            onClick={handleWishlistClick}
            className={isInWishlist ? 'wishlisted' : ''}
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
                <ActionButton name="Download Now" />
                <p>Name your own price</p>
              </section>

              <HeadingText text="Comments" />
            </div>

            <div className="details-right">
              <img
                src={getImageUrl(template.coverImagePath)}
                alt={template.templateTitle}
                className="template-image"
              />

              <div className="rating-div">
                <HeadingText text="Rating" />
                <RatingBox templateRating={template.rating} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateDetail;