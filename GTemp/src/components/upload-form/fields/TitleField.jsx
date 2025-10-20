import React from 'react';

export const TitleField = ({ value, onChange }) => {
  return (
    <div className="form-field">
      <label htmlFor="templateName">Template Name *</label>
      <input
        id="templateName"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter template name"
        required
        className="form-input"
      />
    </div>
  );
};