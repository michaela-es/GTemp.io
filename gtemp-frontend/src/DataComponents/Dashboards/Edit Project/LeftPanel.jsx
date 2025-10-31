import React, { useState } from "react";
import EngineTypeDropUp from "./EngineTypeDropUp";
import { styles } from "../styles";

const LeftPanel = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [price, setPrice] = useState("250.00");
  const [selectedPricing, setSelectedPricing] = useState("₱0 or donation");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedVisibility, setSelectedVisibility] = useState("Select Visibility Option");
  const [hoveredItem, setHoveredItem] = useState(null);

  const maxFiles = 5;

  // === File Handling ===
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
    e.dataTransfer.clearData();
  };

  const addFiles = (newFiles) => {
    const combinedFiles = [...files, ...newFiles].slice(0, maxFiles);
    setFiles(combinedFiles);
  };

  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  // === Price Input Handling ===
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

  // === Pricing Logic ===
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
    <div style={styles.leftPanelContainer}>
      {/* Title */}
      <div style={styles.sectionColumn}>
        <label style={styles.label}>Title</label>
        <input type="text" placeholder="Enter title..." style={styles.inputTitle} />
      </div>

      {/* Pricing */}
      <div style={styles.sectionColumn}>
        <label style={styles.label}>Pricing</label>
        <div style={styles.pricingOptions}>
          {["₱0 or donation", "Paid", "No Payment"].map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelectedPricing(option);
                if (option === "No Payment") setPrice("0.00");
                else setPrice("250.00");
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
                      setSelectedVisibility(option);
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
          <label style={styles.label}>Upload Files (max 5)</label>
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
              minHeight: `${Math.min(files.length )}px`, // expands until 200px
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
        <textarea placeholder="Enter description..." style={styles.textArea} />
      </div>

      {/* Drop-up buttons */}
      <EngineTypeDropUp />

      {/* Actions */}
      <div style={styles.actionButtons}>
        <button style={styles.saveButton}>Save & view page</button>
        <button style={styles.deleteButton}>Delete Project</button>
      </div>
    </div>
  );
};

export default LeftPanel;
