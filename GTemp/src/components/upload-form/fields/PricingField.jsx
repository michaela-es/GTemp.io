import React from 'react';
import { PRICING_TYPES } from '../types/form.types';
import { SuggestedDonation } from './SuggestedDonation';

export const PricingField = ({ pricing, onPricingChange, showDonation, onDonationUpdate }) => {
  return (
    <div className="form-field">
      <label>Pricing *</label>
      <div className="pricing-options">
        <button 
          type="button"
          className={`pricing-btn ${pricing.type === PRICING_TYPES.FREE ? 'active' : ''}`}
          onClick={() => onPricingChange(PRICING_TYPES.FREE)}
        >
          Free ($0)
        </button>
        
        <button 
          type="button"
          className={`pricing-btn ${pricing.type === PRICING_TYPES.DONATION ? 'active' : ''}`}
          onClick={() => onPricingChange(PRICING_TYPES.DONATION)}
        >
          Donation
        </button>
        
        <button 
          type="button"
          className={`pricing-btn ${pricing.type === PRICING_TYPES.PAID ? 'active' : ''}`}
          onClick={() => onPricingChange(PRICING_TYPES.PAID, 10)}
        >
          Paid
        </button>
      </div>

      {pricing.type === PRICING_TYPES.PAID && (
        <div className="price-input">
          <label>Price ($)</label>
          <input
            type="number"
            value={pricing.amount}
            onChange={(e) => onPricingChange(PRICING_TYPES.PAID, Number(e.target.value))}
            min="1"
            step="0.01"
            className="form-input"
          />
        </div>
      )}

      {showDonation && (
        <SuggestedDonation 
          amount={pricing.suggestedDonation}
          onChange={onDonationUpdate}
        />
      )}
    </div>
  );
};