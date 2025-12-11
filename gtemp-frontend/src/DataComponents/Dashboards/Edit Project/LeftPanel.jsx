// LeftPanel.jsx
import React, { useState } from "react";
import EngineTypeDropUp from "./EngineTypeDropUp";
import { styles } from "../styles";

const LeftPanel = ({
  title,
  onTitleChange,
  description,
  onDescriptionChange,
  price,
  onPriceChange,
  onPriceBlur,
  selectedPricing,
  onPricingSelect,
  selectedVisibility,
  onVisibilitySelect,
  files,
  addFiles,
  removeFile,
  engine,
  type,
  onEngineTypeSelect,
  onSave,
  onClear,
  isSubmitting,
  message,
  existingFiles = [],
  removeExistingFile
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const maxFiles = 5;
  
  // SAFE conversion - handle all cases
  const safeExistingFiles = React.useMemo(() => {
    if (!existingFiles) return [];
    
    if (Array.isArray(existingFiles)) {
      return existingFiles.map(file => ({
        // Normalize property names
        id: file.id,
        name: file.fileName || file.filename || file.name || `File ${file.id}`,
        // Keep all original properties
        ...file
      }));
    }
    
    if (typeof existingFiles === 'object' && existingFiles !== null) {
      const filesArray = Object.values(existingFiles);
      return filesArray.map(file => ({
        id: file.id,
        name: file.fileName || file.filename || file.name || `File ${file.id}`,
        ...file
      }));
    }
    
    return [];
  }, [existingFiles]);
  
  const totalFiles = files.length + safeExistingFiles.length;

  // File input handler with max limit check
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    const availableSlots = maxFiles - totalFiles;
    
    if (availableSlots <= 0) {
      alert(`Maximum of ${maxFiles} files reached. Remove some files first.`);
      return;
    }

    const filesToAdd = selectedFiles.slice(0, availableSlots);
    
    if (filesToAdd.length > 0) {
      addFiles(filesToAdd);
    }

    // Clear the file input for re-selection
    e.target.value = '';
  };

  // Drag & drop handlers
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
    
    const availableSlots = maxFiles - totalFiles;
    if (availableSlots <= 0) {
      alert(`Maximum of ${maxFiles} files reached. Remove some files first.`);
      return;
    }

    const droppedFiles = Array.from(e.dataTransfer.files || []);
    const filesToAdd = droppedFiles.slice(0, availableSlots);
    
    if (filesToAdd.length > 0) {
      addFiles(filesToAdd);
    }
    
    e.dataTransfer.clearData();
  };

  const renderPricingField = () => {
    if (selectedPricing === "$0 or donation") {
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
    return null;
  };

  const renderPriceInput = (disabled) => (
    <div style={styles.currencyInputContainer}>
      <span style={styles.pesoSymbol}>$</span>
      <input
        type="text"
        inputMode="decimal"
        value={disabled ? "0.00" : price}
        onChange={(e) => onPriceChange(e.target.value)}
        onBlur={onPriceBlur}
        disabled={disabled}
        style={{
          ...styles.inputPricing,
          paddingLeft: "25px",
          ...(disabled ? styles.disabledInput : {}),
        }}
      />
    </div>
  );

  const renderFiles = () => {
    if (totalFiles === 0) {
      return "Drag & drop files here or click 'Choose Files'";
    }

    return (
      <>
        {/* Existing files from database */}
        {safeExistingFiles.map((file, index) => (
          <div key={`existing-${file.id || index}`} style={styles.fileRow}>
            <span style={styles.fileName}>
              {file.name}
              <span style={styles.existingFileBadge}> (existing)</span>
            </span>
            <button
              onClick={() => {
                console.log("Removing existing file:", file.id, file.name);
                removeExistingFile(file.id);
              }}
              style={styles.removeFileButton}
              type="button"
              title="Remove file"
            >
              ×
            </button>
          </div>
        ))}
        
        {/* Newly uploaded files */}
        {files.map((file, index) => (
          <div key={`new-${index}`} style={styles.fileRow}>
            <span style={styles.fileName}>{file.name}</span>
            <button
              onClick={() => {
                console.log("Removing new file:", index, file.name);
                removeFile(index);
              }}
              style={styles.removeFileButton}
              type="button"
              title="Remove file"
            >
              ×
            </button>
          </div>
        ))}
      </>
    );
  };

  return (
    <div style={styles.leftPanelContainer}>
      {/* Message */}
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

      {/* Title */}
      <div style={styles.sectionColumn}>
        <label style={styles.label}>Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter title..."
          style={styles.inputTitle}
        />
      </div>

      {/* Pricing */}
      <div style={styles.sectionColumn}>
        <label style={styles.label}>Pricing</label>
        <div style={styles.pricingOptions}>
          {["$0 or donation", "Paid", "No Payment"].map((option) => (
            <button
              key={option}
              onClick={() => onPricingSelect(option)}
              style={{
                ...styles.pricingButton,
                ...(selectedPricing === option ? styles.activePricingButton : {}),
              }}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Price/Visibility + Upload Section */}
      <div style={styles.flexRow}>
        <div style={styles.sectionColumn}>
          {renderPricingField()}

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
                      onVisibilitySelect(option);
                      setIsDropdownOpen(false);
                    }}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      ...styles.dropdownItem,
                      ...(hoveredItem === index ? styles.dropdownItemHover : {}),
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Upload Section */}
        <div style={styles.sectionColumn}>
          <div style={styles.uploadHeader}>
            <label style={styles.label}>Upload Files (max {maxFiles})</label>
            {totalFiles > 0 && (
              <span style={styles.fileCount}>
                {totalFiles} file{totalFiles !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          <input
            type="file"
            id="fileInput"
            style={styles.hiddenInput}
            onChange={handleFileChange}
            multiple
            disabled={totalFiles >= maxFiles}
          />
          
          <button
            onClick={() => document.getElementById("fileInput").click()}
            style={{
              ...styles.uploadButton,
              ...(totalFiles >= maxFiles ? styles.disabledButton : {}),
            }}
            type="button"
            disabled={totalFiles >= maxFiles}
            title={totalFiles >= maxFiles ? "Maximum files reached" : "Add files"}
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
              backgroundColor: isDragging ? "#f0f9f0" : "#fafafa",
              minHeight: totalFiles > 0 ? "auto" : "60px",
              minWidth: "139px",
              padding: totalFiles > 0 ? "8px" : "20px",
            }}
          >
            {renderFiles()}
          </div>
          
          {totalFiles >= maxFiles && (
            <div style={styles.maxFilesWarning}>
              Maximum of {maxFiles} files reached
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div style={styles.sectionColumn}>
        <label style={styles.label}>Description</label>
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Enter description..."
          style={styles.textArea}
        />
      </div>

      {/* Engine & Type */}
      <div style={styles.sectionColumn}>
        <EngineTypeDropUp 
          onSelect={onEngineTypeSelect} 
          selectedEngine={engine} 
          selectedType={type} 
        />
        {engine && type && (
          <div style={styles.selectedEngineType}>
            Selected: {engine} - {type}
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={styles.actionButtons}>
        <button 
          style={styles.saveButton} 
          onClick={onSave} 
          disabled={isSubmitting} 
          type="button"
        >
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
        <button 
          style={styles.deleteButton} 
          onClick={onClear} 
          type="button"
        >
          Clear Form
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;