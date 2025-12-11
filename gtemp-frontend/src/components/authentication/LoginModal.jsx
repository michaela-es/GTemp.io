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
  
  const { login } = useAuth();
  
  const [localError, setLocalError] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (localError) setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setIsLoading(true);

    if (!formData.username.trim()) {
      setLocalError('Please enter your username');
      setIsLoading(false);
      return;
    }

    if (!formData.password) {
      setLocalError('Please enter your password');
      setIsLoading(false);
      return;
    }

    try {
      const loginData = {
        identifier: formData.username.trim(),
        password: formData.password
      };

      console.log('Login attempt with:', loginData);

      const userData = await authAPI.login(loginData);
      
      console.log('Login API response:', userData);
      
      if (!userData || !userData.token) {
        throw new Error('No token received from server');
      }

      login({
        userId: userData.userId,
        username: userData.username,
        email: userData.email,
        wallet: userData.wallet,
        token: userData.token
      });
      
      console.log('Auth context updated');
      
      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }
      
      onClose();
      
    } catch (err) {
      console.error('Login error:', err);
      setLocalError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
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

  if (showRegister) {
    return (
      <RegisterModal 
        onClose={handleCloseAll}
        onSwitchToLogin={handleSwitchToLogin}
      />
    );
  }

  return (
    <div className="modal-overlay" onClick={!isLoading ? onClose : undefined}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h2 className="modal-title">Log in</h2>

          {localError && (
            <div className="error-message" style={{ 
              color: '#c62828', 
              backgroundColor: '#ffebee',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '15px',
              fontSize: '14px'
            }}>
              {localError}
            </div>
          )}

          <div className="modal-field">
            <label htmlFor="username">Username or Email</label> 
            <input
              id="username"
              name="username" 
              type="text"
              placeholder="Enter username or email"
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading}
              autoComplete="username"
              required
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
              disabled={isLoading}
              autoComplete="current-password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="modal-login-button" 
            disabled={isLoading || !formData.username || !formData.password}
            style={{ 
              opacity: (isLoading || !formData.username || !formData.password) ? 0.7 : 1,
              cursor: (isLoading || !formData.username || !formData.password) ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>

          <div className="modal-footer">
            <p className="modal-footer-text">
              Don't have an account?{' '}
              <span 
                className="modal-link create-account" 
                onClick={!isLoading ? handleSwitchToRegister : undefined}
                style={{ 
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  color: isLoading ? '#999' : '#007bff'
                }}
              >
                Create account
              </span>
            </p>
          </div>
        </form>

        <button 
          className="modal-close" 
          onClick={!isLoading ? onClose : undefined}
          disabled={isLoading}
          style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}