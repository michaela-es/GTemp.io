import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './TemplateGrid.css';

const TemplateCard = memo(({ 
  id,
  templateTitle = 'Untitled Template',
  coverImagePath,
  rating = 0,
  downloads = 0,
  templateDesc = ''
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => id && navigate(`/template/${id}`);

  return (
    <article className="template-card" onClick={handleClick}>
      <img 
        src={coverImagePath || '/default-cover.jpg'}
        alt={templateTitle}
        className="card-img"
        onError={(e) => {
          e.target.src = '/default-cover.jpg';
          e.target.onerror = null;
        }}
        loading="lazy"
      />
      
      <div className="card-content">
        <h3 className="card-title">{templateTitle}</h3>
        
        {templateDesc.trim() && (
          <p className="card-desc">
            {templateDesc.length > 100 
              ? `${templateDesc.substring(0, 100)}...` 
              : templateDesc}
          </p>
        )}
        
        <footer className="card-footer">
          <span className="card-rating">
            ⭐ {rating > 0 ? rating.toFixed(1) : 'No ratings'}
          </span>
          <span className="card-downloads">
            ⬇️ {downloads.toLocaleString()}
          </span>
        </footer>
      </div>
    </article>
  );
});

export default TemplateCard;