import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import IconButton from '../components/IconButton';
import '../styles/TemplateDetail.css';
import HeadingText from '../components/HeadingText';
import DescBox from '../components/DescBox';
import ActionButton from '../components/ActionButton';
import { DetailsBox } from '../components/DetailsBox';
import RatingBox from '../components/RatingBox';

const TemplateDetail = () => {
  const { templateID } = useParams();
  const location = useLocation();
  const [template, setTemplate] = useState(location.state?.template);
  const [allTemplates, setAllTemplates] = useState(null);
  const [loading, setLoading] = useState(!location.state?.template);

  useEffect(() => {
    if (template) return;

    const fetchTemplate = async () => {
      setLoading(true);
      try {
        if (!allTemplates) {
          const response = await fetch('/data.json');
          const templates = await response.json();
          setAllTemplates(templates);
          
          const foundTemplate = templates.find(t => t.templateID == templateID);
          setTemplate(foundTemplate);
        } else {
          const foundTemplate = allTemplates.find(t => t.templateID == templateID);
          setTemplate(foundTemplate);
        }
      } catch (error) {
        console.error('Error fetching template:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [templateID, template, allTemplates]);

  if (loading) {
    return <div>Loading template...</div>;
  }

  if (!template) {
    return <div>Template not found</div>;
  }

  return (
  <div className="template-detail-container">
    <div className="sidebar">
      <IconButton
        imgSrc="https://www.svgrepo.com/show/532473/heart.svg"
        name="Add to Wishlist"
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
        />

        <HeadingText text="Download" />    
        <section style={{display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
  );



};

export default TemplateDetail;