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
          console.log(`Template ${index}:`, {
            templateId: template.templateId,
            title: template.title,
            coverImagePath: template.coverImagePath
          });

          const uniqueKey = template.templateId 
            ? template.templateId.toString() 
            : `template-${index}`;

          const { templateId, title, coverImagePath } = template;

          return (
            <TemplateCardHorizontal
              key={uniqueKey}
              wishlistItemDTO={{ templateId, title, coverImagePath }} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default TemplateVerticalContainer;
