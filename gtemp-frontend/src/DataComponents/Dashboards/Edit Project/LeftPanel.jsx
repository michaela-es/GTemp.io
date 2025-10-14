// LeftPanel.jsx
import React, { useState } from "react";
import EngineTypeDropUp from "./EngineTypeDropUp";

const LeftPanel = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const maxFiles = 5;

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

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Title Section */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: "8px", fontWeight: "bold" }}>Title</label>
        <input
          type="text"
          placeholder="Enter title..."
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
        />
      </div>

      {/* Pricing Section */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: "8px", fontWeight: "bold" }}>Pricing</label>
        <div style={{ display: "flex", gap: "10px" }}>
          {["$0 or donation", "Paid", "No Payment"].map((option, index) => (
            <button
              key={index}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                cursor: "pointer",
                backgroundColor: "#fff",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Donation + Upload File Section */}
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
        {/* Suggested Donation */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <label style={{ marginBottom: "8px", fontWeight: "bold" }}>Suggested Donation</label>
          <input
            type="number"
            min={2}
            step={1}
            placeholder="$2"
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <select
            style={{
              marginTop: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select Visibility Option</option>
            <option value="option1">Visible to Public</option>
            <option value="option2">Visible to Owner Only</option>
          </select>
        </div>

        {/* Upload File */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <label style={{ marginBottom: "8px", fontWeight: "bold" }}>Upload Files (max 5)</label>

          {/* Hidden file input */}
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple
          />

          {/* Choose File Button */}
          <button
            onClick={() => document.getElementById("fileInput").click()}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              cursor: "pointer",
              backgroundColor: "#fff",
            }}
          >
            Choose Files
          </button>

          {/* Drag-and-Drop Container */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
                marginTop: "10px",
                height: "80px", // fixed height
                border: `2px dashed ${isDragging ? "#4CAF50" : "#ccc"}`,
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                color: "#888",
                padding: "10px",
                transition: "border 0.2s",
                overflowY: "auto", // scroll when too many files
                gap: "5px",
                width: "100%",
            }}
            >
            {files.length === 0
                ? "Drag & drop files here or click 'Choose Files'"
                : files.map((file, index) => (
                    <div
                    key={index}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                    >
                    <span>{file.name}</span>
                    <button
                        onClick={() => removeFile(index)}
                        style={{
                        border: "none",
                        background: "transparent",
                        color: "red",
                        cursor: "pointer",
                        fontWeight: "bold",
                        }}
                    >
                        ×
                    </button>
                  </div>
                ))}
            </div>

        </div>
      </div>

      {/* Description Section */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: "8px", fontWeight: "bold" }}>Description</label>
        <textarea
          placeholder="Enter description..."
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "100%",
            minHeight: "80px",
          }}
        />
      </div>

      {/* Two Drop-up Buttons */}
      <EngineTypeDropUp />

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Save & view page
        </button>
        <button
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#f44336",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Delete Project
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;
