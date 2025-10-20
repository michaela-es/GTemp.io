import React from 'react';
import { useUploadForm } from './hooks/useUploadForm';
import { TitleField } from './fields/TitleField';
import { PricingField } from './fields/PricingField';
import { DescriptionField } from './fields/DescriptionField';
import { EngineTypeField } from './fields/EngineTypeField';
import { CoverImageField } from './fields/CoverImageField';

export const UploadForm = ({ onSuccess }) => {
  const {
    formData,
    pricing,
    showDonation,
    isSubmitting,
    updateField,
    handlePricingChange,
    updateSuggestedDonation,
    handleSubmit,
    resetForm
  } = useUploadForm();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submissionData = await handleSubmit();
      await onSuccess(submissionData);
      resetForm();
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="upload-form">
      <TitleField
        value={formData.templateName}
        onChange={(value) => updateField('templateName', value)}
      />
      
      <PricingField
        pricing={pricing}
        onPricingChange={handlePricingChange}
        showDonation={showDonation}
        onDonationUpdate={updateSuggestedDonation}
      />
      
      <DescriptionField
        value={formData.templateDesc}
        onChange={(value) => updateField('templateDesc', value)}
      />
      
      <EngineTypeField
        value={{ engine: formData.engine_type, type: formData.template_type }}
        onChange={(value) => {
          updateField('engine_type', value.engine);
          updateField('template_type', value.type);
        }}
      />
      
      
      <CoverImageField
        value={formData.templateImg}
        onChange={(value) => updateField('templateImg', value)}
      />
      
      <div className="form-actions">
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Uploading...' : 'Upload Template'}
        </button>
        
        <button 
          type="button" 
          className="cancel-btn"
          onClick={resetForm}
        >
          Reset Form
        </button>
      </div>
    </form>
  );
};