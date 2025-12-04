import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const TemplateCardHorizontal = memo(({ id, templateTitle, coverImagePath }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/template/${id}`);

  return (
    <div style={styles.card} onClick={handleClick}>
      <img 
        src={coverImagePath || '/default-cover.jpg'}
        alt={templateTitle}
        style={styles.image}
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
    maxWidth: '500px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    padding: '8px 12px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
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
