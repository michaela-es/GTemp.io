import React from 'react';
import TemplateCardHorizontal from './TemplateCardHorizontal';

const TemplateVerticalContainer = ({ templates = [] }) => {
  console.log('TemplateVerticalContainer - templates:', templates);
  console.log('Template count:', templates.length);
  
  if (templates.length === 0) {
    return (
      <div className="text-center py-4">
        <p>No templates found</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto" style={{ maxHeight: '500px' }}>
      <div className="d-flex flex-column gap-2">
        {templates.map((template, index) => {
          // Debug each template
          console.log(`Template ${index}:`, {
            id: template.id,
            templateId: template.templateId,
            title: template.templateTitle || template.title,
            hasImage: !!template.coverImagePath
          });

          // Create a unique key - combine id and index if id is missing
          const uniqueKey = template.id 
            ? template.id.toString() 
            : template.templateId 
              ? `${template.templateId}-${index}`
              : `template-${index}`;

          const templateId = template.id || template.templateId;
          const title = template.templateTitle || template.title || `Template ${templateId}`;
          const imagePath = template.coverImagePath || template.coverImage;

          return (
            <TemplateCardHorizontal
              key={uniqueKey}
              id={templateId}
              templateTitle={title}
              coverImagePath={imagePath}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TemplateVerticalContainer;