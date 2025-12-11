import { useState } from 'react';
import { userAPI } from '../services/userAPI';

export const usePasswordChange = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const validateForm = () => {
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return { isValid: false, message: "All fields are required." };
    }

    if (newPassword.length < 6) {
      return { isValid: false, message: "New password must be at least 6 characters." };
    }

    if (newPassword !== confirmPassword) {
      return { isValid: false, message: "New passwords do not match." };
    }

    if (oldPassword === newPassword) {
      return { isValid: false, message: "New password must be different from current password." };
    }

    return { isValid: true };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error || success) {
      setError(null);
      setSuccess(null);
    }
  };

  const changePassword = async () => {
    const validation = validateForm();
    if (!validation.isValid) {
      setError(validation.message);
      return { success: false, message: validation.message };
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await userAPI.changePassword(formData.oldPassword, formData.newPassword);
      
      setSuccess('Password changed successfully!');
      
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      
      setTimeout(() => setSuccess(null), 3000);
      
      return { success: true, message: 'Password changed successfully!' };
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to change password';
      setError(errorMessage);
      return { success: false, message: errorMessage };
      
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setError(null);
    setSuccess(null);
  };

  return {
    formData,
    loading,
    error,
    success,
    
    handleChange,
    changePassword,
    resetForm,
    
    getField: (fieldName) => formData[fieldName],
    isFormValid: validateForm().isValid
  };
};