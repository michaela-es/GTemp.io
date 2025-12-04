import React from 'react';
import TemplateCard from './TemplateCard';
import './TemplateGrid.css';

const TemplateGrid = ({ templates = [], query = '', filters = {} }) => {
  const hasFilters = Object.values(filters).some(arr => arr.length > 0);

  return (
    <div className="template-grid">
      {templates.length > 0 ? (
        <div className="card-gallery">
          {templates.map((template, index) => (
            <TemplateCard
              key={template.id || index}
              id={template.id}
              templateTitle={template.templateTitle}
              coverImagePath={template.coverImagePath}
              rating={template.rating}
              downloads={template.downloads}
              templateDesc={template.templateDesc}
            />
          ))}
        </div>
      ) : (
        <div className="no-results">
          {query || hasFilters
            ? 'No templates found matching your criteria'
            : 'No templates available'}
        </div>
      )}
    </div>
  );
};

export default TemplateGrid;