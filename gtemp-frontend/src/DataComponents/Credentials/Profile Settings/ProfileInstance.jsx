import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useWishlist } from "../../../context/WishlistContext"; 
import { styles } from "../styles";
import axios from "axios";

const ProfileInstance = ({ setMode }) => {
  const { currentUser, setCurrentUser } = useAuth();
  const { wishlistCount } = useWishlist();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setLocalError] = useState("");

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

  const handleSaveChanges = async () => {
    if (!username && !email) {
      setLocalError("Please enter at least one field (username or email).");
      return;
    }

    if (email && !validateEmail(email)) {
      setLocalError("Please enter a valid email address.");
      return;
    }

    setLocalError("");

    try {
      const updatedUser = {};
      if (username !== currentUser.username) updatedUser.username = username;
      if (email !== currentUser.email) updatedUser.email = email;

      if (Object.keys(updatedUser).length === 0) {
        setLocalError("No changes were made.");
        return;
      }

      const response = await axios.put(
        `http://localhost:8080/api/users`, 
        { 
          userID: currentUser.userID,
          username: updatedUser.username,
          email: updatedUser.email,
        }
      );

      const updatedUserData = response.data; 
      setCurrentUser(updatedUserData);
      localStorage.setItem("currentUser", JSON.stringify(updatedUserData));
    } catch (err) {
      setLocalError(err.response?.data?.message || "Failed to update user.");
    }
  };

  return (
    <>
      <div style={styles.profileDisplayContainer}>
        {/* LEFT FORM */}
        <div style={styles.leftForm}>
          <div style={styles.label}>Username</div>
          <input
            type="text"
            style={styles.input}
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div style={styles.label}>Email Address</div>
          <div style={styles.emailRow}>
            <input
              type="email"
              style={styles.input}
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {error}
            </div>
          )}

          <button style={styles.button} onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>

        {/* RIGHT PROFILE PANEL */}
        <div style={styles.rightProfile}>
          <div style={styles.profileImage}></div>
          <div style={styles.profileUsername}>@{username}</div>
        </div>
      </div>

      {/* STATS */}
      <div style={styles.statsContainer}>
        {[
          ["Account Created", "October 12, 2025"],
          ["Wishlisted Items", wishlistCount],
          ["Reviewed Items", "0"],
          ["Published Content", "0"],
        ].map(([title, value], idx) => (
          <div key={idx} style={styles.statBox}>
            <div style={styles.statTitle}>{title}</div>
            <div style={styles.statValue}>{value}</div>
          </div>
        ))}
      </div>

      {/* BOTTOM BUTTONS */}
      <div style={styles.bottomButtonsContainer}>
        <button style={styles.secondaryButton} onClick={() => setMode("security")}>
          Security
        </button>
      </div>
    </>
  );
};

export default ProfileInstance;
