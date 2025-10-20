// LoginModal.jsx
import { useState } from 'react';
import '../../static/LoginModal.css';

export default function LoginModal({ onClose, onSwitchToCreateAccount, onLoginSuccess }) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = () => {
    if (usernameOrEmail === 'debug' && password === '123') {
      onLoginSuccess('debug');
    } else {
      setError('Invalid username or password');
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <h2 className="modal-title">Log in</h2>

        <div className="modal-field">
          <label>Username or Email</label>
          <input
            type="text"
            placeholder="Enter username or email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
        </div>

        <div className="modal-field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="modal-login-button" onClick={handleLogin}>
          Log in
        </button>

        <div className="modal-footer">
          <p className="modal-link create-account" onClick={onSwitchToCreateAccount}>
            Create account
          </p>
        <p className="modal-link forgot-password">Forgot Password</p>
        </div>


        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
