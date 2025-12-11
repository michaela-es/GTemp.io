import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, DEFAULT_IMAGE_URL } from '../../services/apiClient';

const TemplateCardHorizontal = memo(({ 
  id, 
  templateTitle = 'Untitled Template',
  coverImagePath 
}) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  
  // Ensure id exists
  if (!id) {
    console.error('TemplateCardHorizontal: No ID provided');
    return null;
  }

  const handleClick = () => {
    navigate(`/template/${id}`);
  };

  const getImageUrl = () => {
    if (imageError || !coverImagePath) {
      return DEFAULT_IMAGE_URL;
    }
    
    if (coverImagePath.startsWith('http')) {
      return coverImagePath;
    }
    
    return `${API_BASE_URL.replace('/api', '')}/${coverImagePath.replace(/\\/g, '/')}`;
  };

  return (
    <div style={styles.card} onClick={handleClick}>
      <img 
        src={getImageUrl()}
        alt={templateTitle}
        style={styles.image}
        onError={() => setImageError(true)}
        loading="lazy"
      />
      <h3 style={styles.title}>{templateTitle}</h3>
    </div>
  );
});

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    padding: '8px 12px',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  image: {
    width: '100px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: '6px',
    flexShrink: 0,
  },
  title: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
  },
};

export default TemplateCardHorizontal;