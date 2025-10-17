import React, { useState } from 'react';

export const LoginModal = ({ isOpen, onClose, onLogin, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
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
    onLogin(formData); 
  };

  const handleRegisterClick = () => {
    onClose(); 
    onSwitchToRegister(); 
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username or Email"
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
            <button type="submit">Log In</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
        
        <div className="auth-switch">
          <p>Don't have an account? 
            <button 
              type="button" 
              className="link-button" 
              onClick={handleRegisterClick}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};