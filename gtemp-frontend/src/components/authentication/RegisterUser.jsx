import '../../static/CreateAccountModal.css';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
export default function RegisterUser({ onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    acceptTos: false
  });

  const { register, loading, error, setError } = useAuth();
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (localError) setLocalError('');
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords don't match!");
      return;
    }
    
    if (!formData.acceptTos) {
      setLocalError("Please accept Terms of Service");
      return;
    }

    try {
      const userData = {
        username: formData.username,
        password: formData.password,
        email: formData.email
      };

      await register(userData);
      onClose(); 
      
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const displayError = localError || error;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h2 className="modal-title">Create Account</h2>

          {displayError && (
            <div className="error-message">
              {displayError}
            </div>
          )}

          <div className="modal-field">
            <label htmlFor="username">Username</label>
            <input 
              id="username"
              name="username"
              type="text" 
              placeholder="Enter username" 
              value={formData.username}
              onChange={handleChange}
              required
              minLength="3"
              disabled={loading}
            />
          </div>

          <div className="modal-field">
            <label htmlFor="email">Email Address</label>
            <input 
              id="email"
              name="email"
              type="email" 
              placeholder="Enter email address" 
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="modal-field">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              name="password"
              type="password" 
              placeholder="Enter password" 
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              disabled={loading}
            />
          </div>

          <div className="modal-field">
            <label htmlFor="confirmPassword">Repeat Password</label>
            <input 
              id="confirmPassword"
              name="confirmPassword"
              type="password" 
              placeholder="Repeat password" 
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="tos-container">
            <input 
              type="checkbox" 
              id="tos" 
              name="acceptTos"
              checked={formData.acceptTos}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <label htmlFor="tos">
              I accept the <span className="link">Terms of Service</span> and the{' '}
              <span className="link">Terms and Conditions</span>.
            </label>
          </div>

          <button 
            type="submit" 
            className="modal-login-button"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="modal-footer">
            <label>or already have an account?</label>
            <p className="modal-link" onClick={loading ? undefined : onSwitchToLogin}>
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