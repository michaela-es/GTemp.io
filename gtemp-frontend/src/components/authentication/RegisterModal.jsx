import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function RegisterUser({ onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const { register, loading, error, setError } = useAuth();
  const [localError, setLocalError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (localError) setLocalError('');
    if (error) setError(null);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLocalError('');
    setError(null);

    if (!formData.username || !formData.email || !formData.password) {
      setLocalError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    try {
      const registerData = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      };

      await register(registerData);
      onClose(); 
    } catch (err) {
      console.error('Registration error:', err);
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