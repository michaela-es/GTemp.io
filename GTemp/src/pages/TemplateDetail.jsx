import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const TemplateDetail = () => {
  const { templateID } = useParams();
  const location = useLocation();
  const [template, setTemplate] = useState(location.state?.template);
  const [allTemplates, setAllTemplates] = useState(null);
  const [loading, setLoading] = useState(!location.state?.template);

  useEffect(() => {
    if (template) return;

    const fetchTemplate = async () => {
      setLoading(true);
      try {
        if (!allTemplates) {
          const response = await fetch('/data.json');
          const templates = await response.json();
          setAllTemplates(templates);
          
          const foundTemplate = templates.find(t => t.templateID == templateID);
          setTemplate(foundTemplate);
        } else {
          const foundTemplate = allTemplates.find(t => t.templateID == templateID);
          setTemplate(foundTemplate);
        }
      } catch (error) {
        console.error('Error fetching template:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [templateID, template, allTemplates]);

  if (loading) {
    return <div>Loading template...</div>;
  }

  if (!template) {
    return <div>Template not found</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{template.templateName}</h1>
      <p style={styles.description}>{template.templateDesc}</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#333'
  },
  description: {
    fontSize: '1.1rem',
    color: '#666',
    lineHeight: '1.6'
  }
};

export default TemplateDetail;