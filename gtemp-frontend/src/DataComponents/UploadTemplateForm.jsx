import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { styles } from "./Dashboards/styles";
import EngineTypeDropUp from "./Dashboards/Edit Project/EngineTypeDropUp";
import FileUploadService from "../services/FileUploadService";
import { useAuth } from "../context/AuthContext";
const UploadTemplateForm = () => {
  const [formData, setFormData] = useState({
    templateTitle: "",
    templateDesc: "",
    engine: "",
    type: "",
  });
  const userId = JSON.parse(localStorage.getItem('currentUser') || '{}')?.userID;
  console.log("User ID:", userId);

  console.log("user id:" + userId);

  const [coverImage, setCoverImage] = useState(null);
  const [templateImages, setTemplateImages] = useState([]);
  const [files, setFiles] = useState([]);

  const [price, setPrice] = useState("250.00");
  const [selectedPricing, setSelectedPricing] = useState("Paid");
  const [selectedVisibility, setSelectedVisibility] = useState("Visible to Public");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const maxFiles = 5;
  const maxImages = 5;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) setPrice(value);
  };

  const handlePriceBlur = () => {
    if (selectedPricing === "No Payment") return setPrice("0.00");
    let num = parseFloat(price);
    if (isNaN(num) || num < 250) num = 250;
    setPrice(num.toFixed(2));
  };

  const handleEngineTypeSelect = (engine, type) =>
    setFormData((prev) => ({ ...prev, engine, type }));

  const handlePricingSelect = (option) => {
    setSelectedPricing(option);
    if (option === "No Payment") setPrice("0.00");
    else if (option === "Paid") setPrice("250.00");
    else setPrice("0.00");
  };

  const handleVisibilitySelect = (option) => {
    setSelectedVisibility(option);
    setIsDropdownOpen(false);
  };

  const onDropCover = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) setCoverImage(acceptedFiles[0]);
  }, []);

  const onDropImages = useCallback((acceptedFiles) => {
    setTemplateImages((prev) => [...prev, ...acceptedFiles].slice(0, maxImages));
  }, []);

  const onDropFiles = useCallback((acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles].slice(0, maxFiles));
  }, []);

  const { getRootProps: getCoverProps, getInputProps: getCoverInputProps } = useDropzone({
    onDrop: onDropCover,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const { getRootProps: getImagesProps, getInputProps: getImagesInputProps } = useDropzone({
    onDrop: onDropImages,
    accept: { "image/*": [] },
  });

  const { getRootProps: getFilesProps, getInputProps: getFilesInputProps } = useDropzone({
    onDrop: onDropFiles,
  });

  const handleRemoveImage = (index) =>
    setTemplateImages((prev) => prev.filter((_, i) => i !== index));
  const handleRemoveFile = (index) => setFiles((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.templateTitle.trim()) return setMessage("Error: Title is required");
    if (!formData.engine || !formData.type)
      return setMessage("Error: Engine and Type are required");
    if (!coverImage) return setMessage("Error: Cover image is required");

    setIsSubmitting(true);
    setMessage("");

    try {
      const templateData = {
        templateTitle: formData.templateTitle.trim(),
        templateDesc: formData.templateDesc.trim(),
        price: selectedPricing === "No Payment" ? 0 : parseFloat(price) || 0,
        visibility: selectedVisibility === "Visible to Public",
        engine: formData.engine,
        type: formData.type,
        views: 0,
        downloads: 0,
        templateOwner: userId,
        rating: 0,
        averageRating: 0,
        wishlistCount: 0,
        isWishlisted: false,
        revenue: 0
      };

      const formDataToSend = new FormData();
      
      const templateBlob = new Blob([JSON.stringify(templateData)], {
        type: 'application/json'
      });
      formDataToSend.append("template", templateBlob);
      
      formDataToSend.append("coverImage", coverImage);
      templateImages.forEach((img) => formDataToSend.append("images", img));
      files.forEach((file) => formDataToSend.append("files", file));

      console.log("Template data:", templateData);
      console.log("FormData entries:");
      for (let [key, value] of formDataToSend.entries()) {
        if (value instanceof Blob) {
          console.log(`${key}: Blob (${value.type}, ${value.size} bytes)`);
        } else if (value instanceof File) {
          console.log(`${key}: ${value.name} (${value.size} bytes)`);
        } else {
          console.log(`${key}:`, value);
        }
      }

      const response = await FileUploadService.uploadTemplate(formDataToSend);
      
      console.log("Success:", response.data);
      setMessage("Template created successfully!");
      
      setFormData({ templateTitle: "", templateDesc: "", engine: "", type: "" });
      setCoverImage(null);
      setTemplateImages([]);
      setFiles([]);
      setPrice("250.00");
      setSelectedPricing("Paid");
      setSelectedVisibility("Visible to Public");
    } catch (err) {
      console.error("Upload error:", err);
      const errorMessage =
        err.response?.data?.details ||
        err.response?.data?.error ||
        err.message ||
        "Unknown error";
      setMessage(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.leftPanelContainer}>
      {message && (
        <div
          style={{
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "4px",
            backgroundColor: message.includes("Error") ? "#ffebee" : "#e8f5e8",
            color: message.includes("Error") ? "#c62828" : "#2e7d32",
            ...styles.label,
          }}
        >
          {message}
        </div>
      )}

      <div style={styles.sectionColumn}>
        <label style={styles.label}>Title *</label>
        <input
          type="text"
          name="templateTitle"
          value={formData.templateTitle}
          onChange={handleInputChange}
          placeholder="Enter title..."
          style={styles.inputTitle}
          required
        />
      </div>

      <div style={styles.flexRow}>
        <div style={styles.sectionColumn}>
          <label style={styles.label}>Pricing *</label>
          <div style={styles.pricingOptions}>
            {["₱0 or donation", "Paid", "No Payment"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handlePricingSelect(option)}
                style={{
                  ...styles.pricingButton,
                  ...(selectedPricing === option ? styles.activePricingButton : {}),
                }}
              >
                {option}
              </button>
            ))}
          </div>

          <div style={styles.sectionColumn}>
            <label style={styles.label}>Visibility *</label>
            <div style={styles.dropdownContainer}>
              <div
                style={styles.dropdownButton}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedVisibility}
              </div>
              {isDropdownOpen && (
                <div style={styles.dropdownMenu}>
                  {["Visible to Public", "Visible to Owner Only"].map((option, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleVisibilitySelect(option)}
                      style={styles.dropdownItem}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={styles.sectionColumn}>
          <label style={styles.label}>Cover Image *</label>
          <div {...getCoverProps()} style={styles.dropzone}>
            <input {...getCoverInputProps()} />
            {coverImage ? coverImage.name : "Drag & drop or click to select cover image"}
          </div>
        </div>

        <div style={styles.sectionColumn}>
          <label style={styles.label}>Template Images (max {maxImages})</label>
          <div {...getImagesProps()} style={styles.dropzone}>
            <input {...getImagesInputProps()} />
            Drag & drop images here or click to select
          </div>
          <div>
            {templateImages.map((img, idx) => (
              <span key={idx} style={{ marginRight: "5px" }}>
                {img.name} <button type="button" onClick={() => handleRemoveImage(idx)}>×</button>
              </span>
            ))}
          </div>
        </div>

        <div style={styles.sectionColumn}>
          <label style={styles.label}>Additional Files (max {maxFiles})</label>
          <div {...getFilesProps()} style={styles.dropzone}>
            <input {...getFilesInputProps()} />
            Drag & drop files here or click to select
          </div>
          <div>
            {files.map((file, idx) => (
              <div key={idx} style={styles.fileRow}>
                <span style={{ fontSize: "12px" }}>{file.name}</span>
                <button type="button" onClick={() => handleRemoveFile(idx)} style={styles.removeFileButton}>×</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.sectionColumn}>
        <label style={styles.label}>Description</label>
        <textarea
          name="templateDesc"
          value={formData.templateDesc}
          onChange={handleInputChange}
          placeholder="Enter description..."
          style={styles.textArea}
          rows="4"
        />
      </div>

      <div style={styles.sectionColumn}>
        <label style={styles.label}>Engine & Type *</label>
        <EngineTypeDropUp onSelect={handleEngineTypeSelect} />
        {formData.engine && formData.type && (
          <div style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>
            Selected: {formData.engine} - {formData.type}
          </div>
        )}
      </div>

      <div style={styles.actionButtons}>
        <button type="submit" style={styles.saveButton} disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Save & View Page"}
        </button>
        <button
          type="button"
          style={styles.deleteButton}
          onClick={() => {
            setFormData({ templateTitle: "", templateDesc: "", engine: "", type: "" });
            setCoverImage(null);
            setTemplateImages([]);
            setFiles([]);
            setPrice("250.00");
            setSelectedPricing("Paid");
            setSelectedVisibility("Visible to Public");
            setMessage("");
          }}
        >
          Clear Form
        </button>
      </div>
    </form>
  );
};

export default UploadTemplateForm;