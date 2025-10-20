import React from 'react';
import { UploadForm } from '../components/upload-form/UploadForm';
import { useAppData } from '../contexts/AppDataContext';
import '../styles/UploadForm.css';

const UploadPage = () => {
  const { addTemplate, data } = useAppData();

  const handleUploadSuccess = async (formData) => {
    try {
      const newTemplate = await addTemplate(formData);
      console.log('Template uploaded successfully:', newTemplate);
      alert(`"${newTemplate.templateName}" uploaded successfully!`);
      return newTemplate;
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
      throw error;
    }
  };

  // Count user templates
  const userTemplatesCount = data.filter(t => t.templateOwner === 'You').length;

  return (
    <div className="page-wrapper">
      
      <div className="upload-page">
        <header className="upload-header">
          <h1>Upload New Game Template</h1>
          <p className="page-description">
            Share your game template with the community. Fill out the form below to get started.
          </p>
        </header>
        
        <div className="form-container">
          <UploadForm onSuccess={handleUploadSuccess} />
        </div>
        
      </div>
      
    </div>
  );
};

export default UploadPage;