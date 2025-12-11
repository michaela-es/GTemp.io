import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './DownloadModal.css';

const DownloadModal = ({ template, onClose, onConfirm }) => {
  const [donation, setDonation] = useState(''); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(''); 

  const { currentUser, refreshWallet } = useAuth();
  const userEmail = currentUser?.email;
  const userBalance = currentUser?.wallet || 0;

  useEffect(() => {
    if (template.priceSetting === "Paid" || template.priceSetting === "$0 or donation") {
      setDonation(template.price.toString());
    }
  }, [template]);

  const handleConfirm = async () => {
    if (isProcessing) return;

    if (!currentUser) {
      setError('Please log in to download');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      let amount = 0;

      if (template.priceSetting === "$0 or donation") {
        amount = parseFloat(donation) || 0;
        if (amount < 0) throw new Error('Donation amount cannot be negative');
      } else if (template.priceSetting === "Paid") {
        amount = template.price;
      }

      if (amount > 0 && userBalance < amount) {
        throw new Error(`Insufficient balance. You need $${amount}, but have $${userBalance}`);
      }

      await onConfirm(amount);

      if (amount > 0 && currentUser?.id) await refreshWallet(currentUser.id);

      onClose();
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  // Donation section handler
  const handleDonationChange = (e) => {
    setDonation(e.target.value);
  };

  const isPaidTemplate = template.priceSetting === "Paid" || template.priceSetting === "$0 or donation";

  return (
    <div className={`share__modal ${currentUser ? 'show-modal' : ''}`}>
      <div className="share__modal__content">
        <div className="share__modal__header">
          <span>Download '{template.templateTitle}'</span>
          <button 
            className="close_modal_btn" 
            onClick={() => !isProcessing && onClose()} 
            disabled={isProcessing}
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          {/* Wallet Display */}
          {currentUser && (
            <div className="wallet-display">
              <div className="wallet-label">Your Wallet Balance</div>
              <div className="wallet-amount">${userBalance.toFixed(2)}</div>
              <div className="wallet-email">{userEmail}</div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <span>⚠️ {error}</span>
              <button onClick={() => setError('')}>×</button>
            </div>
          )}

          {/* Donation / Paid Sections */}
          {template.priceSetting === "$0 or donation" && (
            <div className="donation-section">
              <div className="share__modal_input">
                <label>Your Donation ($)</label>
                <div className="input-with-prefix">
                  <span className="prefix">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={donation}
                    onChange={handleDonationChange}
                    disabled={isProcessing}
                  />
                </div>
                <div className="quick-buttons">
                  <button onClick={() => setDonation('0')} className="quick-btn" disabled={isProcessing}>$0</button>
                  <button onClick={() => setDonation(template.price.toString())} className="quick-btn" disabled={isProcessing}>${template.price}</button>
                  <button onClick={() => setDonation((template.price * 1.5).toFixed(2))} className="quick-btn" disabled={isProcessing}>${(template.price * 1.5).toFixed(2)}</button>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  onClick={handleConfirm} 
                  className="btn-pay" 
                  disabled={isProcessing || (parseFloat(donation) > userBalance)}
                >
                  {isProcessing ? 'Processing...' : `Pay $${parseFloat(donation) || 0}`}
                </button>
              </div>
            </div>
          )}

          {template.priceSetting === "Paid" && (
            <div className="paid-section">
              <div className="price-card">
                <div className="price-label">Template Price</div>
                <div className="price">${template.price}</div>
                <div className={`balance-check ${userBalance >= template.price ? 'ok' : 'low'}`}>
                  {userBalance >= template.price ? `✓ You have enough balance` : `✗ Need $${(template.price - userBalance).toFixed(2)} more`}
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  onClick={handleConfirm} 
                  className="btn-purchase"
                  disabled={isProcessing || userBalance < template.price}
                >
                  {isProcessing ? 'Processing...' : `Purchase for $${template.price}`}
                </button>
                <button onClick={onClose} className="btn-cancel" disabled={isProcessing}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
