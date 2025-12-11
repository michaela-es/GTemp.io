import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/authAPI'; 
import '../../static/LoginModal.css';
import RegisterModal from './RegisterModal';

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: '', 
    password: ''
  });
  
  const { login: updateAuthContext, loading, error, setError, setLoading } = useAuth();
  const [localError, setLocalError] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  
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
    setLoading(true);

    if (!formData.username || !formData.password) {
      setLocalError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const loginData = {
        username: formData.username,
        password: formData.password
      };

      const user = await authAPI.login(loginData);
      
      updateAuthContext(user);
      
      onLoginSuccess(user); 
      onClose();
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToRegister = () => {
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
  };

  const handleCloseAll = () => {
    setShowRegister(false);
    onClose();
  };

  const displayError = localError || error;

  if (showRegister) {
    return (
      <RegisterModal 
        onClose={handleCloseAll}
        onSwitchToLogin={handleSwitchToLogin}
      />
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleLogin}>
          <h2 className="modal-title">Log in</h2>

          {displayError && <p className="error-message">{displayError}</p>}

          <div className="modal-field">
            <label htmlFor="username">Username</label> 
            <input
              id="username"
              name="username" 
              type="text"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
              autoComplete="username"
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
              autoComplete="current-password"
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
              onClick={loading ? undefined : handleSwitchToRegister}
              style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              Create account
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