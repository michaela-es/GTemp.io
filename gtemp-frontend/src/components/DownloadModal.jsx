import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './DownloadModal.css';

const DownloadModal = ({ 
  template, 
  onClose, 
  onConfirm, 
  onFreeDownload
}) => {
  const [donation, setDonation] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  
  const { currentUser, refreshWallet } = useAuth();
  const userEmail = currentUser?.email;
  const userBalance = currentUser?.wallet || 0;

  useEffect(() => {
    if (template.priceSetting === "Paid") {
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
      
      if (template.priceSetting === "₱0 or donation") {
        amount = parseFloat(donation) || 0;
        if (amount < 0) {
          throw new Error('Donation amount cannot be negative');
        }
      } else if (template.priceSetting === "Paid") {
        amount = template.price;
      }
      
      // Validate balance
      if (amount > 0 && userBalance < amount) {
        throw new Error(`Insufficient balance. You need ₱${amount}, but have ₱${userBalance}`);
      }
      
      // Call parent's onConfirm and WAIT for it to complete
      await onConfirm(amount);
      
      // Refresh wallet after successful payment
      if (amount > 0 && currentUser?.id) {
        await refreshWallet(currentUser.id);
      }
      
      // Close modal automatically after success
      onClose();
      
    } catch (error) {
      setError(error.message || 'Payment failed. Please try again.');
      setIsProcessing(false); // RESET processing state on error
    }
  };

  const handleFreeDownloadClick = async () => {
    if (isProcessing) return;
    
    if (!currentUser) {
      setError('Please log in to download');
      return;
    }
    
    setIsProcessing(true);
    setError('');
    
    try {
      await onFreeDownload();
      onClose(); // Close after successful download
    } catch (error) {
      setError(error.message || 'Download failed. Please try again.');
      setIsProcessing(false); // RESET processing state on error
    }
  };

  // If no user is logged in
  if (!currentUser) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h3>Download '{template.templateTitle}'</h3>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          <div className="modal-body">
            <div className="login-required">
              <div className="login-icon">🔒</div>
              <h4>Login Required</h4>
              <p>You need to be logged in to download this template.</p>
              <button 
                className="btn-primary"
                onClick={() => {
                  onClose();
                  window.location.href = '/login';
                }}
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Download '{template.templateTitle}'</h3>
          <button 
            className="close-btn" 
            onClick={() => !isProcessing && onClose()}
            disabled={isProcessing}
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          {/* Wallet Balance */}
          <div className="wallet-display">
            <div className="wallet-label">Your Wallet Balance</div>
            <div className="wallet-amount">₱{userBalance.toFixed(2)}</div>
            <div className="wallet-email">{userEmail}</div>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
              <button 
                className="error-close"
                onClick={() => setError('')}
              >
                ×
              </button>
            </div>
          )}

          {template.priceSetting === "₱0 or donation" && (
            <div className="donation-section">
              <div className="suggested-price">
                <span>Suggested: </span>
                <strong>₱{template.price}</strong>
              </div>
              
              <div className="input-section">
                <label>Your Donation (₱)</label>
                <div className="input-with-prefix">
                  <span className="prefix">₱</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={donation}
                    onChange={(e) => setDonation(e.target.value)}
                    disabled={isProcessing}
                  />
                </div>
                <small className="hint">
                  Enter 0 for free download, or any amount to support the creator
                </small>
                
                <div className="quick-buttons">
                  <button 
                    type="button"
                    className="quick-btn"
                    onClick={() => setDonation('0')}
                    disabled={isProcessing}
                  >
                    ₱0 (Free)
                  </button>
                  <button 
                    type="button"
                    className="quick-btn"
                    onClick={() => setDonation(template.price.toString())}
                    disabled={isProcessing}
                  >
                    ₱{template.price}
                  </button>
                  <button 
                    type="button"
                    className="quick-btn"
                    onClick={() => setDonation((template.price * 1.5).toString())}
                    disabled={isProcessing}
                  >
                    ₱{(template.price * 1.5).toFixed(2)}
                  </button>
                </div>
              </div>
              
              <div className="action-buttons">
                <button 
                  onClick={handleConfirm}
                  disabled={isProcessing || (parseFloat(donation) > 0 && parseFloat(donation) > userBalance)}
                  className={`btn-pay ${isProcessing ? 'processing' : ''}`}
                >
                  {isProcessing ? 'Processing...' : `Pay ₱${parseFloat(donation) || 0}`}
                  {isProcessing && <span className="spinner"></span>}
                </button>
                
                <button 
                  onClick={handleFreeDownloadClick}
                  disabled={isProcessing}
                  className="btn-free"
                >
                  {isProcessing ? 'Processing...' : 'Download for Free'}
                </button>
              </div>
            </div>
          )}

          {template.priceSetting === "Paid" && (
            <div className="paid-section">
              <div className="price-card">
                <div className="price-label">Template Price</div>
                <div className="price">₱{template.price}</div>
                
                <div className={`balance-check ${userBalance >= template.price ? 'ok' : 'low'}`}>
                  {userBalance >= template.price ? (
                    <>
                      <span className="check-icon">✓</span>
                      <span>You have enough balance</span>
                    </>
                  ) : (
                    <>
                      <span className="check-icon">✗</span>
                      <span>Need ₱{(template.price - userBalance).toFixed(2)} more</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="action-buttons">
                <button 
                  onClick={handleConfirm}
                  disabled={isProcessing || userBalance < template.price}
                  className={`btn-purchase ${isProcessing ? 'processing' : ''}`}
                >
                  {isProcessing ? 'Processing...' : `Purchase for ₱${template.price}`}
                  {isProcessing && <span className="spinner"></span>}
                </button>
                
                {userBalance < template.price && (
                  <button 
                    onClick={() => {
                      onClose();
                      window.location.href = '/wallet';
                    }}
                    className="btn-wallet"
                  >
                    Add Money to Wallet
                  </button>
                )}
                
                <button 
                  onClick={onClose}
                  disabled={isProcessing}
                  className="btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {template.priceSetting === "No Payment" && (
            <div className="free-section">
              <div className="free-badge">FREE</div>
              <p className="free-text">This template is completely free!</p>
              
              <button 
                onClick={handleFreeDownloadClick}
                disabled={isProcessing}
                className={`btn-download ${isProcessing ? 'processing' : ''}`}
              >
                {isProcessing ? 'Downloading...' : 'Download Now'}
                {isProcessing && <span className="spinner"></span>}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;