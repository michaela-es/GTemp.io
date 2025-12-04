import React from 'react';
import TemplateCardHorizontal from './TemplateCardHorizontal';

const TemplateVerticalContainer = ({ templates }) => {
  return (
    <div className="overflow-auto" style={{ maxHeight: '500px' }}>
      <div className="d-flex flex-column gap-2">
        {templates.map(template => (
          <TemplateCardHorizontal
            key={template.id}
            id={template.id}
            templateTitle={template.templateTitle}
            coverImagePath={template.coverImagePath}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateVerticalContainer;
