import React from 'react';
import { useNavigate } from 'react-router-dom'


const TemplateCard = ({templateID, templateName, templateImg, templateRating, templateDls, templateDesc }) => {
   const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/template/${templateID}`);
  };

  return (
    <div style={styles.card} onClick={handleClick}>
      <img src={templateImg} alt={templateName} style={styles.image} />
      <h3 style={styles.title}>{templateName}</h3>
      {templateDesc && <p style={styles.description}>{templateDesc}</p>}
      <div style={styles.stats}>
        <span>⭐ {templateRating}</span>
        <span>⬇️ {templateDls}</span>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: '250px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    padding: '12px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    cursor: 'pointer'
  },
  image: {
    width: '100%',
    height: '140px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  title: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '600',
  },
  description: {
    margin: '4px 0',
    fontSize: '14px',
    color: '#555',
    flexGrow: 1,
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
  },
};

export default TemplateCard;
