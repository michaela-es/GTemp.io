import React from 'react';

export const DescriptionField = ({ value, onChange }) => {
  return (
    <div className="form-field">
      <label htmlFor="templateDesc">Description *</label>
      <textarea
        id="templateDesc"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe your template..."
        rows="4"
        required
        className="form-textarea"
      />
    </div>
  );
};