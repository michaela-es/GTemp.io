import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { userAPI } from "../services";
export const useProfileUpdate = () => {
  const { currentUser, updateUser: updateAuthContext } = useAuth();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username || "");
      setEmail(currentUser.email || "");
    } else {
      setUsername("");
      setEmail("");
    }
  }, [currentUser]);

  const validateEmail = useCallback((email) => {
    if (!email) return true;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }, []);

  const validateForm = useCallback(() => {
    if (!username.trim() && !email.trim()) {
      setError("Please enter at least one field (username or email).");
      return false;
    }

    if (email.trim() && !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    return true;
  }, [username, email, validateEmail]);

  const getChanges = useCallback(() => {
    const changes = {};
    if (username !== currentUser?.username) changes.username = username;
    if (email !== currentUser?.email) changes.email = email;
    return changes;
  }, [username, email, currentUser]);

  const hasChanges = useCallback(() => {
    const changes = getChanges();
    return Object.keys(changes).length > 0;
  }, [getChanges]);

  const handleSaveChanges = useCallback(async () => {
  setError("");
  setSuccess("");
  
  if (!validateForm()) return;

  const changes = getChanges();
  if (Object.keys(changes).length === 0) {
    setError("No changes were made.");
    return;
  }

  setLoading(true);

  try {
    const result = await userAPI.updateUser(changes);
    
    if (result.success) {
      const updatedUserData = result.data;
      
      updateUser(updatedUserData);
      setSuccess("Profile updated successfully!");
    } else {
      setError(result.message || "Failed to update profile.");
    }
    
  } catch (err) {
    console.error("Update error:", err);
    setError(err.message || "Failed to update user.");
  } finally {
    setLoading(false);
  }
}, [validateForm, getChanges, updateUser]);

  const handleEmailChange = useCallback((value) => {
    setEmail(value);
    if (error) setError("");
    if (success) setSuccess("");
  }, [error, success]);

  const resetForm = useCallback(() => {
    if (currentUser) {
      setUsername(currentUser.username || "");
      setEmail(currentUser.email || "");
    }
    setError("");
    setSuccess("");
  }, [currentUser]);

  return {
    username,
    email,
    error,
    loading,
    success,
    
    handleUsernameChange,
    handleEmailChange,
    handleSaveChanges,
    resetForm,
    
    hasChanges: hasChanges(),
    displayUsername: `@${username}`,
    userStats: {
      username,
      email
    }
  };
};