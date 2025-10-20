import { useState } from 'react';
import { usePricingLogic } from './usePricingLogic';
import { FormData } from '../types/form.types';

export const useUploadForm = (initialData = FormData) => {
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { pricing, showDonation, handlePricingChange, updateSuggestedDonation } = 
    usePricingLogic(initialData.pricing);

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const prepareSubmissionData = () => {
    return {
      templateName: formData.templateName,
      templateDesc: formData.templateDesc,
      templateImg: formData.templateImg ? URL.createObjectURL(formData.templateImg) : '/sample.png',
      engine_type: formData.engine_type,
      template_type: formData.template_type,
      price: pricing.type === 'paid' ? pricing.amount : 0,
      category: formData.category,
      templateOwner: 'You', // Would come from auth
      genre: formData.genre,
    };
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const submissionData = prepareSubmissionData();
      return submissionData;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(FormData);
  };

  return {
    formData,
    pricing,
    showDonation,
    isSubmitting,
    updateField,
    handlePricingChange,
    updateSuggestedDonation,
    handleSubmit,
    resetForm
  };
};