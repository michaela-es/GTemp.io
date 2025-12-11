import React from "react";
import { useWishlist } from "../../../context/WishlistContext"; 
import { useProfileUpdate } from "../../../hooks/useProfileupdate";
import { styles } from "../styles";

const ProfileInstance = ({ setMode }) => {
  const { wishlistCount } = useWishlist();
  const {
    username,
    email,
    error,
    loading,
    success,
    handleUsernameChange,
    handleEmailChange,
    handleSaveChanges,
    displayUsername
  } = useProfileUpdate();

  return (
    <>
      <div style={styles.profileDisplayContainer}>
        <div style={styles.leftForm}>
          <div style={styles.label}>Username</div>
          <input
            type="text"
            style={styles.input}
            placeholder="Enter username"
            value={username}
            onChange={(e) => handleUsernameChange(e.target.value)}
            disabled={loading}
          />

          <div style={styles.label}>Email Address</div>
          <div style={styles.emailRow}>
            <input
              type="email"
              style={styles.input}
              placeholder="Enter email address"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <div style={{ 
              color: "#c62828", 
              backgroundColor: "#ffebee",
              padding: "10px",
              borderRadius: "4px",
              marginTop: "10px",
              fontSize: "14px"
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ 
              color: "#2e7d32", 
              backgroundColor: "#e8f5e9",
              padding: "10px",
              borderRadius: "4px",
              marginTop: "10px",
              fontSize: "14px"
            }}>
              {success}
            </div>
          )}

          <button 
            style={{ 
              ...styles.button, 
              opacity: loading ? 0.7 : 1,
              marginTop: "20px"
            }}
            onClick={handleSaveChanges}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div style={styles.rightProfile}>
          <div style={styles.profileImage}></div>
          <div style={styles.profileUsername}>{displayUsername}</div>
          <div style={{ 
            marginTop: "5px", 
            color: "#666", 
            fontSize: "14px" 
          }}>
            {email}
          </div>
        </div>
      </div>

      <div style={styles.bottomButtonsContainer}>
        <button 
          style={styles.secondaryButton} 
          onClick={() => setMode("security")}
          disabled={loading}
        >
          Security
        </button>
      </div>
    </>
  );
};

export default ProfileInstance;