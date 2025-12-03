import React, { useState } from 'react';

export const RegisterModal = ({ isOpen, onClose, onRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData); 
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <div className="modal-buttons">
            <button type="submit">Register</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;