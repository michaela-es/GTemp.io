import React from 'react';
import LeftPanel from "../DataComponents/Dashboards/Edit Project/LeftPanel";
import RightPanel from "../DataComponents/Dashboards/Edit Project/RightPanel";
import FileUploadService from "../services/FileUploadService";
import TemplateService from "../services/TemplateService";
import { useTemplateForm } from './TemplateFormContext';
import { useTemplateHandlers } from './useTemplateHandlers';

const TemplateCreationForm = ({ onRefresh }) => {
  const form = useTemplateForm();
  const handlers = useTemplateHandlers();
  console.log("TemplateCreationForm - existingFiles:", form.existingFiles);
  console.log("TemplateCreationForm - files:", form.files)

const handleSubmit = async () => {
  if (form.isSubmitting) return;

  console.log("=== FRONTEND DEBUG ===");
  console.log("form.filenamesToDelete:", form.filenamesToDelete);
  console.log("Type:", typeof form.filenamesToDelete);
  console.log("Length:", form.filenamesToDelete?.length);
  
  if (form.filenamesToDelete && form.filenamesToDelete.length > 0) {
    console.log("First item:", form.filenamesToDelete[0]);
    console.log("Type of first item:", typeof form.filenamesToDelete[0]);
  }
  if (!form.title.trim()) {
    form.setMessage("Error: Title is required");
    return;
  }
  if (!form.engine || !form.type) {
    form.setMessage("Error: Engine and Type are required");
    return;
  }
  
  if (!form.isEditing && !form.coverImage) {
    form.setMessage("Error: Cover image is required");
    return;
  }
  
  if (form.isEditing && !form.coverImageUrl && !form.coverImage) {
    form.setMessage("Error: Cover image is required");
    return;
  }
  
  const totalScreenshots = form.screenshotUrls.length + form.newScreenshotFiles.length;
  if (totalScreenshots === 0) {
    form.setMessage("Error: At least one screenshot is required");
    return;
  }
  
  if (form.files.length + (form.existingFiles?.length || 0) === 0) {
    form.setMessage("Error: At least one additional file is required");
    return;
  }

  form.setIsSubmitting(true);
  form.setMessage("");

  try {

    const templateData = {
      templateTitle: form.title.trim(),
      templateDesc: form.description.trim(),
      priceSetting: form.selectedPricing,
      price: form.selectedPricing === "No Payment" ? 0 : parseFloat(form.price) || 0,
      visibility: form.selectedVisibility === "Visible to Public",
      engine: form.engine,
      type: form.type,
      releaseDate: new Date(), 
      filenamesToDelete: form.filenamesToDelete || [],
      fileIdsToDelete: form.fileIdsToDelete || []
    };

    const formDataToSend = new FormData();
    formDataToSend.append("template", new Blob([JSON.stringify(templateData)], { 
      type: "application/json" 
    }));

    if (form.coverImage instanceof File) {
      formDataToSend.append("coverImage", form.coverImage);
    }

    form.newScreenshotFiles.forEach((img) => {
      if (img instanceof File) {
        formDataToSend.append("images", img);
      }
    });
    
    form.files.forEach((file) => {
      if (file instanceof File) {
        formDataToSend.append("files", file);
      }
    });

    let response;
    if (form.isEditing && form.editingTemplateId) {
      response = await FileUploadService.updateTemplate(form.editingTemplateId, formDataToSend);
      form.setMessage("Template updated successfully!");
    } else {
      response = await FileUploadService.uploadTemplate(formDataToSend);
      form.setMessage("Template created successfully!");
    }

    form.resetForm();
    if (onRefresh) onRefresh();
    
  } catch (err) {
    console.error("Upload error:", err);
    const errorMessage =
      err?.response?.data?.details ||
      err?.response?.data?.error ||
      err?.message ||
      "Unknown error";
    form.setMessage(`Error: ${errorMessage}`);
  } finally {
    form.setIsSubmitting(false);
  }
};
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <LeftPanel
          title={form.title}
          onTitleChange={form.setTitle}
          description={form.description}
          onDescriptionChange={form.setDescription}
          price={form.price}
          onPriceChange={handlers.handlePriceChange}
          onPriceBlur={handlers.handlePriceBlur}
          selectedPricing={form.selectedPricing}
          onPricingSelect={handlers.handlePricingSelect}
          selectedVisibility={form.selectedVisibility}
          onVisibilitySelect={form.setSelectedVisibility}
          files={form.files}
          existingFiles={form.existingFiles}
          addFiles={handlers.addFiles}
          removeFile={handlers.removeFile}
          removeExistingFile={handlers.removeExistingFile}
          engine={form.engine}
          type={form.type}
          onEngineTypeSelect={handlers.handleEngineTypeSelect}
          onSave={handleSubmit}
          onClear={form.resetForm}
          isSubmitting={form.isSubmitting}
          message={form.message}
          isEditing={form.isEditing}
        />
      </div>

      <div style={{ flex: 1 }}>
        <RightPanel
          coverImage={form.coverImage}
          coverImageUrl={form.coverImageUrl}
          onCoverChange={handlers.handleCoverChange}
          screenshotUrls={form.screenshotUrls}
          newScreenshotFiles={form.newScreenshotFiles}
          addScreenshots={handlers.addScreenshots}
          removeScreenshotUrl={handlers.removeScreenshotUrl}
          removeScreenshotFile={handlers.removeScreenshotFile}
          maxImages={5}
        />
      </div>
    </div>
  );
};

export default TemplateCreationForm;