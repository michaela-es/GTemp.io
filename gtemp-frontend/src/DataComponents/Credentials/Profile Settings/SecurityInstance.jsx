import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext"; // adjust path
import { styles } from "../styles";
import axios from "axios";

const SecurityInstance = ({ setMode }) => {
  const { currentUser, refreshWallet } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
  setError("");
  setSuccess("");

  if (!currentPassword || !newPassword || !confirmPassword) {
    setError("All fields are required");
    return;
  }

  if (newPassword !== confirmPassword) {
    setError("New password and confirmation do not match");
    return;
  }

  if (newPassword.length < 6) {
    setError("New password must be at least 6 characters long");
    return;
  }

  setLoading(true);
  try {
    const response = await axios.post(
      `http://localhost:8080/api/users/change-password`,
      {
        userID: currentUser.userID,
        currentPassword,
        newPassword,
      }
    );
    setSuccess(
      typeof response.data === "string"
        ? response.data
        : response.data?.message || "Password changed successfully"
    );
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (err) {
    setError(
      typeof err.response?.data === "string"
        ? err.response.data
        : err.response?.data?.message || "Failed to change password"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <button style={styles.backButton} onClick={() => setMode("profile")}>
        ← Back
      </button>

      <div style={styles.securityContainer}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <div style={styles.label}>Current Password</div>
        <input
          type="password"
          style={styles.input}
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <div style={styles.label}>New Password</div>
        <input
          type="password"
          style={styles.input}
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <div style={styles.label}>Confirm New Password</div>
        <input
          type="password"
          style={styles.input}
          placeholder="Re-enter new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleChangePassword}
          disabled={loading}
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </div>
    </>
  );
};

export default SecurityInstance;
