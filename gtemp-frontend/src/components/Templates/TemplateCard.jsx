import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './TemplateGrid.css';

const TemplateCard = memo(({ 
  id,
  templateTitle,
  coverImagePath,
  rating,
  downloads,
  templateDesc
}) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/template/${id}`);

  return (
    <div className="template-card" onClick={handleClick}>
      <img 
        src={coverImagePath || '/default-cover.jpg'}
        alt={templateTitle}
        className="card-image"
      />
      
      <div className="card-content">
        <h3 className="card-title">{templateTitle}</h3>

        {templateDesc && (
          <p className="card-description">{templateDesc}</p>
        )}

        <div className="card-stats">
          <span>⭐ {rating || 0}</span>
          <span>⬇️ {downloads || 0}</span>
        </div>
      </div>
    </div>
  );
});

export default TemplateCard;