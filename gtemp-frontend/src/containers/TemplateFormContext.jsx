import React, { createContext, useContext, useState } from 'react';
import TemplateService from '../services/TemplateService';
const TemplateFormContext = createContext();

export const useTemplateForm = () => {
  const context = useContext(TemplateFormContext);
  if (!context) {
    throw new Error('useTemplateForm must be used within TemplateFormProvider');
  }
  return context;
};

export const TemplateFormProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("250.00");
  const [selectedPricing, setSelectedPricing] = useState("Paid");
  const [selectedVisibility, setSelectedVisibility] = useState("Visible to Public");
  const [files, setFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [screenshotUrls, setScreenshotUrls] = useState([]);
  const [newScreenshotFiles, setNewScreenshotFiles] = useState([]);
  const [engine, setEngine] = useState("");
  const [type, setType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState(null);
  const [fileIdsToDelete, setFileIdsToDelete] =  useState([]);
  const [filenamesToDelete, setFilenamesToDelete] = useState([]); // for images

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFileIdsToDelete([]);
    setPrice("250.00");
    setSelectedPricing("Paid");
    setSelectedVisibility("Visible to Public");
    setFiles([]);
    setExistingFiles([]);
    setCoverImage(null);
    setCoverImageUrl(null);
    setScreenshotUrls([]);
    setNewScreenshotFiles([]);
    setEngine("");
    setType("");
    setMessage("");
    setIsEditing(false);
    setEditingTemplateId(null);
  };

  const populateEditForm = async (template) => {
    setIsEditing(true);
    setEditingTemplateId(template.id);
    setFileIdsToDelete([]);
    setTitle(template.templateTitle || "");
    setDescription(template.templateDesc || "");
    setPrice(template.price?.toString() || "0.00");
    setSelectedPricing(template.priceSetting || "Paid");
    setSelectedVisibility(template.visibility ? "Visible to Public" : "Private");
    setEngine(template.engine || "");
    setType(template.type || "");
    
    setCoverImageUrl(template.coverImagePath || null);
    setCoverImage(null);
    
    try {
      const screenshotsResponse = await fetch(`http://localhost:8080/api/templates/${template.id}/images`);
      if (screenshotsResponse.ok) {
        const urls = await screenshotsResponse.json();
        setScreenshotUrls(urls);
      } else {
        setScreenshotUrls([]);
      }
    } catch (error) {
      console.error("Error fetching screenshots:", error);
      setScreenshotUrls([]);
    }
    
    try {
    const response = await fetch(`http://localhost:8080/api/templates/${template.id}/files`);
    if (response.ok) {
      const filesData = await response.json();
      setExistingFiles(filesData);
    } else {
      setExistingFiles([]);
    }
  } catch (error) {
    console.error("Error fetching template files:", error);
    setExistingFiles([]);
  }
    
    setNewScreenshotFiles([]);
    setFiles([]);
    
    console.log("Populated form for editing:", template.templateTitle);
  };

  const value = {
    title, 
    description,
    price,
    selectedPricing,
    selectedVisibility,
    files,
    existingFiles,
    coverImage,
    coverImageUrl,
    screenshotUrls,
    newScreenshotFiles,
    engine,
    type,
    isSubmitting,
    message,
    isEditing,
    editingTemplateId,
    
    setTitle,
    setDescription,
    setPrice,
    setSelectedPricing,
    setSelectedVisibility,
    setFiles,
    setExistingFiles,
    setCoverImage,
    setCoverImageUrl,
    setScreenshotUrls,
    setNewScreenshotFiles,
    setEngine,
    setType,
    setIsSubmitting,
    setMessage,
    setIsEditing,
    setEditingTemplateId,
    
    filenamesToDelete,
    setFilenamesToDelete,

    fileIdsToDelete,
    setFileIdsToDelete,

    resetForm,
    populateEditForm
  };

  return (
    <TemplateFormContext.Provider value={value}>
      {children}
    </TemplateFormContext.Provider>
  );
};