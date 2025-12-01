import React, { memo, useMemo } from 'react';
import TemplateCard from './TemplateCard';

const TemplateGrid = memo(({ templates = [], query = '', filters = {} }) => {
  
  const hasFilters = Object.values(filters).some(arr => arr.length > 0);

  const renderedTemplates = useMemo(() => {
    return templates.map((template, index) => (
      <TemplateCard
        key={template.id || index}
        id={template.id}
        templateTitle={template.templateTitle}
        coverImagePath={template.coverImagePath}
        rating={template.rating}
        downloads={template.downloads}
        templateDesc={template.templateDesc}
      />
    ));
  }, [templates]);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {templates.length > 0 ? (
        renderedTemplates
      ) : (
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', fontSize: '18px', color: '#666' }}>
          {query || hasFilters
            ? 'No templates found matching your criteria'
            : 'No templates available'}
        </div>
      )}
    </div>
  );
});

export default TemplateGrid;
