import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/authAPI';

export default function RegisterModal({ onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const { login } = useAuth();
  const [localError, setLocalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const registerData = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      };

      const userData = await authAPI.register(registerData);
      
      login({
        userId: userData.userId,
        username: userData.username,
        email: userData.email,
        wallet: userData.wallet,
        token: userData.token
      });
      
      onClose();
      
    } catch (err) {
      setLocalError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window register-window" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h2 className="modal-title">Create Account</h2>

          {localError && <p className="error-message">{localError}</p>}

          <div className="modal-field">
            <label htmlFor="username">Username *</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading} 
              autoComplete="username"
              required
            />
          </div>

          <div className="modal-field">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading} 
              autoComplete="email"
              required
            />
          </div>

          <div className="modal-field">
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Choose a password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="modal-field">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              autoComplete="new-password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="modal-register-button" 
            disabled={isLoading} 
          >
            {isLoading ? 'Creating Account...' : 'Create Account'} 
          </button>

          <div className="modal-footer">
            <p>Already have an account?</p>
            <p 
              className="modal-link" 
              onClick={isLoading ? undefined : onSwitchToLogin} 
              style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }} 
            >
              Log in
            </p>
          </div>
        </form>

        <button className="modal-close" onClick={onClose} disabled={isLoading}>
          ✕
        </button>
      </div>
    </div>
  );
}