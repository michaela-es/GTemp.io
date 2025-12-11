import React from "react";
import { usePasswordChange } from "../../../hooks/usePasswordChange";
import { styles } from "../styles";

const SecurityInstance = ({ setMode }) => {
  const {
    formData,
    loading,
    error,
    success,
    handleChange,
    changePassword,
    resetForm
  } = usePasswordChange();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await changePassword();
  };

  const handleBack = () => {
    if (!loading) {
      resetForm();
      setMode("profile");
    }
  };

  return (
    <>
      <button 
        style={styles.backButton} 
        onClick={handleBack}
        disabled={loading}
      >
        ← Back to Profile
      </button>

      <div style={styles.securityContainer}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Change Password</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <div style={styles.label}>Current Password</div>
            <input
              type="password"
              name="oldPassword"
              style={styles.input}
              placeholder="Enter current password"
              value={formData.oldPassword}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <div style={styles.label}>New Password</div>
            <input
              type="password"
              name="newPassword"
              style={styles.input}
              placeholder="Enter new password (min. 6 characters)"
              value={formData.newPassword}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <div style={styles.label}>Confirm New Password</div>
            <input
              type="password"
              name="confirmPassword"
              style={styles.input}
              placeholder="Re-enter new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              backgroundColor: "#ffebee",
              color: "#c62828",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "15px",
              fontSize: "14px"
            }}>
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div style={{
              backgroundColor: "#e8f5e9",
              color: "#2e7d32",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "15px",
              fontSize: "14px"
            }}>
              {success}
            </div>
          )}

          <button 
            type="submit"
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
              width: "100%",
              padding: "12px"
            }}
            disabled={loading}
          >
            {loading ? "Changing Password..." : "Change Password"}
          </button>
        </form>

        {/* Password Tips */}
        <div style={{
          marginTop: "25px",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          fontSize: "14px",
          color: "#666"
        }}>
          <strong>Password Tips:</strong>
          <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
            <li>Use at least 6 characters</li>
            <li>Include a mix of letters, numbers, and symbols</li>
            <li>Avoid using personal information</li>
            <li>Don't reuse passwords from other sites</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SecurityInstance;