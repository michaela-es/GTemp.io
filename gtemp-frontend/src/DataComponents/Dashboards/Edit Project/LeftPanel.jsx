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
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const maxFiles = 5;

  // file input handler (converts FileList to Array)
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    addFiles(selectedFiles);
  };

  // drag & drop handlers for files (optional)
  const [isDragging, setIsDragging] = useState(false);
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
    const droppedFiles = Array.from(e.dataTransfer.files || []);
    addFiles(droppedFiles);
    e.dataTransfer.clearData();
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
          {["₱0 or donation", "Paid", "No Payment"].map((option) => (
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

      {/* Price / Donation + Upload Section */}
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
          <label style={styles.label}>Upload Files (max {maxFiles})</label>
          <input
            type="file"
            id="fileInput"
            style={styles.hiddenInput}
            onChange={handleFileChange}
            multiple
          />
          <button
            onClick={() => document.getElementById("fileInput").click()}
            style={styles.uploadButton}
            type="button"
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
              minHeight: `${Math.min(files.length)}px`,
              minWidth: "139px",
            }}
          >
            {files.length === 0 ? (
              "Drag & drop files here or click 'Choose Files'"
            ) : (
              files.map((file, index) => (
                <div key={index} style={styles.fileRow}>
                  <span>{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    style={styles.removeFileButton}
                    type="button"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
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
        <EngineTypeDropUp onSelect={onEngineTypeSelect} selectedEngine={engine} selectedType={type} />
        {engine && type && (
          <div style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>
            Selected: {engine} - {type}
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={styles.actionButtons}>
        <button style={styles.saveButton} onClick={onSave} disabled={isSubmitting} type="button">
          {isSubmitting ? "Creating..." : "Save"}
        </button>
        <button style={styles.deleteButton} onClick={onClear} type="button">
          Clear Form
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;