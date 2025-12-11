import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setIsLoading(true);

    // Validation
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

  const displayError = localError || error;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window register-window" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleRegister}>
          <h2 className="modal-title">Create Account</h2>

          {displayError && <p className="error-message">{displayError}</p>}

          <div className="modal-field">
            <label htmlFor="username">Username *</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
              autoComplete="username"
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
              disabled={loading}
              autoComplete="email"
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
              disabled={loading}
              autoComplete="new-password"
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
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <button 
            type="submit" 
            className="modal-register-button" 
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="modal-footer">
            <p>Already have an account?</p>
            <p 
              className="modal-link" 
              onClick={loading ? undefined : onSwitchToLogin}
              style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              Log in
            </p>
          </div>
        </form>

        <button className="modal-close" onClick={onClose} disabled={loading}>
          ✕
        </button>
      </div>
    </div>
  );
}