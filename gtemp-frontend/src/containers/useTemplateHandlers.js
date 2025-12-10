import { useTemplateForm } from './TemplateFormContext';

export const useTemplateHandlers = () => {
  const form = useTemplateForm();

  const handlePricingSelect = (option) => {
    form.setSelectedPricing(option);
    if (option === "No Payment") form.setPrice("0.00");
    else if (option === "Paid") form.setPrice("250.00");
    else form.setPrice("0.00");
  };

  const handlePriceChange = (value) => {
    if (/^\d*\.?\d{0,2}$/.test(value)) form.setPrice(value);
  };

  const handlePriceBlur = () => {
    if (form.selectedPricing === "No Payment") {
      form.setPrice("0.00");
      return;
    }
    let num = parseFloat(form.price);
    if (isNaN(num) || num < 250) num = 250;
    form.setPrice(num.toFixed(2));
  };

  const addFiles = (newFiles) => {
    const combined = [...form.files, ...newFiles].slice(0, 5);
    form.setFiles(combined);
  };

  const removeFile = (index) => {
    form.setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingFile = (fileId) => {
  console.log("Removing file ID:", fileId);
    if (form.setFileIdsToDelete) {
    form.setFileIdsToDelete(prev => [...prev, fileId]);
  }
    form.setExistingFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleEngineTypeSelect = (selectedEngine, selectedType) => {
    form.setEngine(selectedEngine);
    form.setType(selectedType);
  };

  const handleCoverChange = (file) => {
    form.setCoverImage(file);
  };

  const addScreenshots = (newImgs) => {
    const combined = [...form.newScreenshotFiles, ...newImgs].slice(0, 5);
    form.setNewScreenshotFiles(combined);
  };

  const removeScreenshotUrl = (url) => { 
    const filename = url.split('/').pop();
    
    if (form.setFilenamesToDelete) {
      form.setFilenamesToDelete(prev => [...prev, filename]);
    }
    
    form.setScreenshotUrls(prev => prev.filter(u => u !== url));
  };

  const removeScreenshotFile = (index) => {
    form.setNewScreenshotFiles(prev => prev.filter((_, i) => i !== index));
  };

  return {
    handlePricingSelect,
    handlePriceChange,
    handlePriceBlur,
    addFiles,
    removeFile,
    removeExistingFile,
    handleEngineTypeSelect,
    handleCoverChange,
    addScreenshots,
    removeScreenshotUrl,
    removeScreenshotFile
  };
};