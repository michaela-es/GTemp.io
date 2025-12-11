import React, { createContext, useContext, useState, useEffect } from 'react';
import TemplateService from '../services/TemplateService';
import { useAuth } from "../context/AuthContext"; // <-- added

const TemplateFormContext = createContext();

export const useTemplateForm = () => {
  const context = useContext(TemplateFormContext);
  if (!context) {
    throw new Error('useTemplateForm must be used within TemplateFormProvider');
  }
  return context;
};

export const TemplateFormProvider = ({ children }) => {
  const { currentUser } = useAuth(); // <-- detect logout/login

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
  const [fileIdsToDelete, setFileIdsToDelete] = useState([]);
  const [filenamesToDelete, setFilenamesToDelete] = useState([]); 

  // -------------------------
  // Reset Form (used also on logout)
  // -------------------------
  const resetForm = () => {
    setTitle("");
    setDescription("");
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

    setFileIdsToDelete([]);
    setFilenamesToDelete([]);
  };

  useEffect(() => {
    if (!currentUser) {
      resetForm(); // <-- main change
    }
  }, [currentUser]);

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

    // Load Screenshots
    try {
      const screenshotsResponse = await fetch(`http://localhost:8080/api/templates/${template.id}/images`);
      setScreenshotUrls(screenshotsResponse.ok ? await screenshotsResponse.json() : []);
    } catch (error) {
      console.error("Error fetching screenshots:", error);
      setScreenshotUrls([]);
    }

    // Load Files
    try {
      const response = await fetch(`http://localhost:8080/api/templates/${template.id}/files`);
      setExistingFiles(response.ok ? await response.json() : []);
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
    populateEditForm,
  };

  return (
    <TemplateFormContext.Provider value={value}>
      {children}
    </TemplateFormContext.Provider>
  );
};
