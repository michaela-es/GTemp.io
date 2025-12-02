    import React, { useState } from 'react';
    import '../static/DownloadModal.css';

    const DownloadModal = ({ template, onClose, onConfirm, onFreeDownload }) => {
    const [donation, setDonation] = useState('');

    const handleConfirm = () => {
        if (template.priceSetting === "₱0 or donation") {
        const value = parseFloat(donation) || 0;
        onConfirm(value); // Call backend purchase endpoint
        } else if (template.priceSetting === "Paid") {
        onConfirm(template.price); // Deduct exact price
        }
    };

    return (
        <div className="modal-overlay">
        <div className="modal">
            {/* Header */}
            <div className="modal-header">
            <h3>Download '{template.templateTitle}'</h3>
            <button className="close-btn" onClick={onClose}>×</button>
            </div>

            {/* Body */}
            <div className="modal-body">
            {template.priceSetting === "₱0 or donation" && (
                <>
                <label>₱</label>
                <input
                    type="number"
                    placeholder="0"
                    value={donation}
                    onChange={(e) => setDonation(e.target.value)}
                />
                <div className="modal-buttons">
                    <button onClick={handleConfirm}>Confirm</button>
                    <button onClick={onFreeDownload}>Download for FREE</button>
                </div>
                </>
            )}

            {template.priceSetting === "Paid" && (
                <>
                <label>Price</label>
                <div className="price-container">₱ {template.price}</div>
                <div className="modal-buttons">
                    <button onClick={handleConfirm}>Confirm</button>
                </div>
                </>
            )}
            </div>
        </div>
        </div>
    );
    };

    export default DownloadModal;
