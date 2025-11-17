import React from 'react';
import TemplateCard from '../components/TemplateCard';

const TemplateGrid = ({ templates = [], query = '', filters = {} }) => {
  const hasFilters = Object.values(filters).some(arr => arr.length > 0);

  const gridStyles = {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    noResults: {
      gridColumn: '1 / -1',
      textAlign: 'center',
      padding: '40px',
      fontSize: '18px',
      color: '#666'
    }
  };

  return (
    <div style={gridStyles.container}>
      {templates.length > 0 ? (
        templates.map((template, index) => (
          <TemplateCard
            key={template.id || index}
            id={template.id}            
            templateTitle={template.templateTitle}  
            coverImagePath={template.coverImagePath} 
            rating={template.rating}   
            downloads={template.downloads} 
            templateDesc={template.templateDesc}
          />
        ))
      ) : (
        <div style={gridStyles.noResults}>
          {query || hasFilters
            ? 'No templates found matching your criteria'
            : 'No templates available'}
        </div>
      )}
    </div>
  );
};

export default TemplateGrid;