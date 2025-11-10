import React, { useState } from "react";
import { styles } from "./Dashboards/styles";
import EngineTypeDropUp from "./Dashboards/Edit Project/EngineTypeDropUp";
import FileUploadService from "../services/FileUploadService";
const UploadTemplateForm = () => {
  const [formData, setFormData] = useState({
    templateTitle: "",
    templateDesc: "",
    engine: "",
    type: ""
  });
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [price, setPrice] = useState("250.00");
  const [selectedPricing, setSelectedPricing] = useState("Paid");
  const [selectedVisibility, setSelectedVisibility] = useState("Visible to Public");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const maxFiles = 5;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const addFiles = (newFiles) => {
    const combinedFiles = [...files, ...newFiles].slice(0, maxFiles);
    setFiles(combinedFiles);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const handlePriceChange = (e) => {
    let value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) setPrice(value);
  };

  const handlePriceBlur = () => {
    let num = parseFloat(price);
    if (selectedPricing === "No Payment") {
      setPrice("0.00");
      return;
    }
    if (isNaN(num) || num < 250) num = 250;
    setPrice(num.toFixed(2));
  };

  const handleEngineTypeSelect = (engine, type) => {
    setFormData(prev => ({
      ...prev,
      engine,
      type
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;

  setIsSubmitting(true);
  setMessage("");

  if (!formData.templateTitle.trim()) {
    setMessage("Error: Title is required");
    setIsSubmitting(false);
    return;
  }

  if (!formData.engine || !formData.type) {
    setMessage("Error: Please select Engine and Type");
    setIsSubmitting(false);
    return;
  }

  try {
    const finalPrice =
      selectedPricing === "No Payment" ? 0 : parseFloat(price) || 0;

    const templateData = {
      templateTitle: formData.templateTitle.trim(),
      price: finalPrice,
      templateDesc: formData.templateDesc.trim(),
      visibility: selectedVisibility === "Visible to Public",
      engine: formData.engine,
      type: formData.type,
    };

    console.log("Submitting template with files:", templateData, files);

    const savedTemplate = await FileUploadService.uploadTemplate(templateData, files);

    setMessage("Template created successfully!");
    console.log("Saved template:", savedTemplate);

    setFormData({ templateTitle: "", templateDesc: "", engine: "", type: "" });
    setFiles([]);
    setPrice("250.00");
    setSelectedPricing("Paid");
    setSelectedVisibility("Visible to Public");
  } catch (error) {
    console.error("Submission error:", error);
    setMessage(`Error: ${error.response?.data || error.message}`);
  } finally {
    setIsSubmitting(false);
  }
};

  const renderPricingField = () => {
    if (selectedPricing === "₱0 or donation") {
      return (
        <>
          <label style={styles.label}>Suggested Donation</label>
          {renderPriceInput(false)}
        </>
      );
    }
    if (selectedPricing === "Paid") {
      return (
        <>
          <label style={styles.label}>Price</label>
          {renderPriceInput(false)}
        </>
      );
    }
    if (selectedPricing === "No Payment") {
      return (
        <>
          <label style={styles.label}>Pricing Unavailable</label>
          {renderPriceInput(true)}
        </>
      );
    }
  };

  const renderPriceInput = (disabled) => (
    <div style={styles.currencyInputContainer}>
      <span style={styles.pesoSymbol}>₱</span>
      <input
        type="text"
        inputMode="decimal"
        value={disabled ? "0.00" : price}
        onChange={handlePriceChange}
        onBlur={handlePriceBlur}
        disabled={disabled}
        style={{
          ...styles.inputPricing,
          paddingLeft: "25px",
          ...(disabled ? styles.disabledInput : {}),
        }}
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={styles.leftPanelContainer}>
      {message && (
        <div style={{
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "4px",
          backgroundColor: message.includes("Error") ? "#ffebee" : "#e8f5e8",
          color: message.includes("Error") ? "#c62828" : "#2e7d32",
          ...styles.label
        }}>
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

      <div style={styles.sectionColumn}>
        <label style={styles.label}>Pricing *</label>
        <div style={styles.pricingOptions}>
          {["₱0 or donation", "Paid", "No Payment"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setSelectedPricing(option);
                if (option === "No Payment") setPrice("0.00");
                else if (option === "Paid") setPrice("250.00");
                else setPrice("0.00");
              }}
              style={{
                ...styles.pricingButton,
                ...(selectedPricing === option ? styles.activePricingButton : {}),
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.flexRow}>
        <div style={styles.sectionColumn}>
          {renderPricingField()}
          
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
                {["Visible to Public", "Visible to Owner Only"].map((option, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedVisibility(option);
                      setIsDropdownOpen(false);
                    }}
                    style={styles.dropdownItem}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={styles.sectionColumn}>
          <label style={styles.label}>Upload Files (max {maxFiles})</label>
          <input
            type="file"
            id="fileInput"
            style={styles.hiddenInput}
            onChange={handleFileChange}
            multiple
          />
          <button
            type="button"
            onClick={() => document.getElementById("fileInput").click()}
            style={styles.uploadButton}
          >
            Choose Files
          </button>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              ...styles.dropZone,
              border: `2px dashed ${isDragging ? "#4CAF50" : "#ccc"}`,
              minHeight: "100px",
              minWidth: "139px",
            }}
          >
            {files.length === 0 ? (
              "Drag & drop files here or click 'Choose Files'"
            ) : (
              files.map((file, index) => (
                <div key={index} style={styles.fileRow}>
                  <span style={{ fontSize: "12px" }}>{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    style={styles.removeFileButton}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
          <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
            {files.length} / {maxFiles} files
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
        <button 
          type="submit" 
          style={styles.saveButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Save & View Page"}
        </button>
        <button 
          type="button" 
          style={styles.deleteButton}
          onClick={() => {
            setFormData({ templateTitle: "", templateDesc: "", engine: "", type: "" });
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