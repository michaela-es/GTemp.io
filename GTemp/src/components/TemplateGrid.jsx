import React from 'react';
import TemplateCard from '../components/TemplateCard';

const TemplateGrid = ({ templates = [], query = '', filters = {} }) => {
  const hasFilters = Object.values(filters).some(arr => arr.length > 0);

  return (
    <div
      className="templates-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        justifyItems: 'center', // centers items in each grid cell
        padding: '20px',
      }}
    >
      {templates.length > 0 ? (
        templates.map((template, index) => (
          <TemplateCard
            key={index}
            templateID={template.templateID}
            templateName={template.templateName}
            templateImg={template.templateImg}
            templateRating={template.templateRating}
            templateDls={template.templateDls}
            templateDesc={template.templateDesc}
            style={{ width: '100%', maxWidth: '250px' }} // ensures consistent card size
          />
        ))
      ) : (
        <p
          style={{
            textAlign: 'center',
            width: '100%',
            fontSize: '1.2rem',
            color: '#555',
          }}
        >
          {query || hasFilters
            ? 'No templates found matching your criteria'
            : 'No templates available'}
        </p>
      )}
    </div>
  );
};

export default TemplateGrid;
