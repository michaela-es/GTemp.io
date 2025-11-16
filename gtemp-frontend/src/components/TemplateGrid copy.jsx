import React from 'react';
import TemplateCard from '../components/TemplateCard';

const TemplateGrid = ({ templates = [], query = '', filters = {} }) => {
  const hasFilters = Object.values(filters).some(arr => arr.length > 0);

  return (
    <div className="templates-grid">
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
          />
        ))
      ) : (
        <p className="no-results">
          {query || hasFilters
            ? 'No templates found matching your criteria'
            : 'No templates available'}
        </p>
      )}
    </div>
  );
};

export default TemplateGrid;
