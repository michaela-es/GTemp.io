import React, { useState } from "react";
import { styles } from "../styles";

const DeleteAccountInstance = ({ setMode }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <button style={styles.backButton} onClick={() => setMode("profile")}>
        ←
      </button>

      <div style={styles.deleteBox}>
        <div style={styles.deleteTitle}>Permanently Delete Account</div>
        <div style={styles.deleteWarning}>
          Warning: This action is irreversible. All your data, content, and
          history will be permanently erased. Please be absolutely sure before
          proceeding.
        </div>
      </div>

      <button
        style={styles.deleteConfirmButton}
        onClick={() => setShowConfirm(true)}
      >
        Delete My Account
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitle}>Delete My Account</div>
              <button
                style={styles.modalClose}
                onClick={() => setShowConfirm(false)}
              >
                ×
              </button>
            </div>

            <div style={styles.modalText}>
              Are you absolutely sure you want to delete your account?
              <br />
              This action <strong>cannot be undone</strong>. All your data and
              history will be permanently erased.
            </div>

            <button style={styles.modalDeleteButton}>
              Yes, DELETE this account
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAccountInstance;
