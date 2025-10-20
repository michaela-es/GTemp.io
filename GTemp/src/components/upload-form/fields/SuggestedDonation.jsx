// components/upload-form/fields/SuggestedDonation.jsx
import React from 'react';

export const SuggestedDonation = ({ amount, onChange }) => {
  const suggestions = [1, 3, 5, 10, 15, 20];
  
  return (
    <div className="suggested-donation">
      <label>Suggested Donation Amount</label>
      <div className="donation-suggestions">
        {suggestions.map(suggestion => (
          <button
            key={suggestion}
            type="button"
            className={`donation-option ${amount === suggestion ? 'active' : ''}`}
            onClick={() => onChange(suggestion)}
          >
            ${suggestion}
          </button>
        ))}
      </div>
      <input
        type="number"
        value={amount}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder="Custom amount"
        min="0"
        step="1"
        className="form-input"
      />
    </div>
  );
};