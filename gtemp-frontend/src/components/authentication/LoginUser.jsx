import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../static/LoginModal.css';

export default function LoginModal({ onClose, onSwitchToCreateAccount, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  });
  
  const { login, loading, error, setError } = useAuth();
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLocalError('');
    setError(null);

    if (!formData.usernameOrEmail || !formData.password) {
      setLocalError('Please fill in all fields');
      return;
    }

    try {
      const loginData = {
        username: formData.usernameOrEmail,
        password: formData.password
      };

      await login(loginData);
      onLoginSuccess(formData.usernameOrEmail);
      onClose();
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const displayError = localError || error;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleLogin}>
          <h2 className="modal-title">Log in</h2>

          {displayError && <p className="error-message">{displayError}</p>}

          <div className="modal-field">
            <label htmlFor="usernameOrEmail">Username or Email</label>
            <input
              id="usernameOrEmail"
              name="usernameOrEmail"
              type="text"
              placeholder="Enter username or email"
              value={formData.usernameOrEmail}
              onChange={handleChange}
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
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="modal-login-button" 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>

          <div className="modal-footer">
            <p 
              className="modal-link create-account" 
              onClick={loading ? undefined : onSwitchToCreateAccount}
            >
              Create account
            </p>
            <p className="modal-link forgot-password">Forgot Password</p>
          </div>
        </form>

        <button className="modal-close" onClick={onClose} disabled={loading}>
          ✕
        </button>
      </div>
    </div>
  );
}