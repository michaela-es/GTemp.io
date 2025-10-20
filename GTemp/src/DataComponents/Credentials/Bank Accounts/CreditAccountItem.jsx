import React from "react";

const CreditAccountItem = ({ onDeleteClick, styles }) => {
  return (
    <div style={styles.creditRow}>

      <button onClick={onDeleteClick} style={styles.creditCloseButton}>
            ✕
      </button>
      <div style={styles.creditInputGroup}>
        <div style={styles.creditInputBox}>Bank Gcash/Paypal</div>
        <div style={styles.creditInputBox}>Bank Email/Phone Number</div>
      </div>

    </div>
  );
};

export default CreditAccountItem;
