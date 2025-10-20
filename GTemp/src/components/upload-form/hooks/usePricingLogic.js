import { useState, useCallback } from 'react';
import { PRICING_TYPES } from '../types/form.types';

export const usePricingLogic = (initialPricing = { type: PRICING_TYPES.FREE, amount: 0, suggestedDonation: 5 }) => {
  const [pricing, setPricing] = useState({
  ...initialPricing,
  amount: '' 
});
  const [showDonation, setShowDonation] = useState(false);

  const handlePricingChange = useCallback((type, amount = 0) => {
    const newPricing = { 
      ...pricing,
      type, 
      amount 
    };
    
    if (type === PRICING_TYPES.DONATION) {
      setShowDonation(true);
      newPricing.suggestedDonation = type === PRICING_TYPES.FREE ? 0 : 5;
    } else {
      setShowDonation(false);
    }
    
    setPricing(newPricing);
  }, [pricing]);

  const updateSuggestedDonation = useCallback((amount) => {
    setPricing(prev => ({
      ...prev,
      suggestedDonation: amount
    }));
  }, []);

  return {
    pricing,
    showDonation,
    handlePricingChange,
    updateSuggestedDonation
  };
};