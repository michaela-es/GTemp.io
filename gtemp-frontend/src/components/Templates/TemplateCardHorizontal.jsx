import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, DEFAULT_IMAGE_URL } from '../../services/apiClient';

// Component now expects a single prop (wishlistItemDTO)
const TemplateCardHorizontal = memo(({ wishlistItemDTO }) => {
  const { templateId, title, coverImagePath } = wishlistItemDTO;  // Destructure props from wishlistItemDTO
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  // Ensure templateId exists
  if (!templateId) {
    console.error('TemplateCardHorizontal: No templateId provided');
    return null;
  }

  // Handle click to navigate to the template details page
  const handleClick = () => {
    navigate(`/template/${templateId}`);
  };

  // Get image URL, checking for errors and fallback to default image
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
        alt={title || 'Untitled Template'}
        style={styles.image}
        onError={() => setImageError(true)}  // If image fails, set to error state
        loading="lazy"
      />
      <h3 style={styles.title}>{title || 'Untitled Template'}</h3>
    </div>
  );
});

// Styles for the card component
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
