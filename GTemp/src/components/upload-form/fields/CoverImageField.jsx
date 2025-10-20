import React, { useRef } from 'react';

export const CoverImageField = ({ value, onChange }) => {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onChange(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="form-field">
      <label>Cover Image</label>
      <div 
        className="cover-image-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        {value ? (
          <div className="image-preview">
            <img src={URL.createObjectURL(value)} alt="Preview" />
            <p>Click to change image</p>
          </div>
        ) : (
          <div className="upload-placeholder">
            <p>Drag & drop or click to upload cover image</p>
            <p className="upload-hint">Recommended: 16:9 ratio, max 5MB</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden-input"
        />
      </div>
    </div>
  );
};