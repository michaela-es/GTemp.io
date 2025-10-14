import React from "react";
import { styles } from "../styles";

const SecurityInstance = ({ setMode }) => {
  return (
    <>
      <button style={styles.backButton} onClick={() => setMode("profile")}>
        ←
      </button>

      <div style={styles.securityContainer}>
        <div style={styles.label}>Current Password</div>
        <input type="password" style={styles.input} placeholder="Enter current password" />

        <div style={styles.label}>New Password</div>
        <input type="password" style={styles.input} placeholder="Enter new password" />

        <div style={styles.label}>Confirm New Password</div>
        <input type="password" style={styles.input} placeholder="Re-enter new password" />

        <button style={styles.button}>Change Password</button>
      </div>
    </>
  );
};

export default SecurityInstance;
