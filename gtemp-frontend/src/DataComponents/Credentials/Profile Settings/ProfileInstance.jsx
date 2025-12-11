import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useWishlist } from "../../../context/WishlistContext"; 
import { userAPI } from "../../../services/userAPI";
import { styles } from "../styles";

const ProfileInstance = ({ setMode }) => {
  const { currentUser, updateUser: updateAuthContext } = useAuth();
  const { wishlistCount } = useWishlist();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username || "");
      setEmail(currentUser.email || "");
    } else {
      setUsername("");
      setEmail("");
    }
  }, [currentUser]);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (!username && !email) {
      setError("Please enter at least one field (username or email).");
      return false;
    }

    if (email && !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const getChanges = () => {
    const changes = {};
    if (username !== currentUser.username) changes.username = username;
    if (email !== currentUser.email) changes.email = email;
    return changes;
  };

  const handleSaveChanges = async () => {
    setError("");
    
    if (!validateForm()) return;

    const changes = getChanges();
    if (Object.keys(changes).length === 0) {
      setError("No changes were made.");
      return;
    }

    setLoading(true);

    try {
      const updatedUserData = await userAPI.updateUser(changes);
      
      updateAuthContext(updatedUserData);
      
      localStorage.setItem("currentUser", JSON.stringify({
        ...currentUser,
        ...updatedUserData
      }));
      
      setError("");
      
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message || "Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

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
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />

          <div style={styles.label}>Email Address</div>
          <div style={styles.emailRow}>
            <input
              type="email"
              style={styles.input}
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {error}
            </div>
          )}

          <button 
            style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
            onClick={handleSaveChanges}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div style={styles.rightProfile}>
          <div style={styles.profileImage}></div>
          <div style={styles.profileUsername}>@{username}</div>
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