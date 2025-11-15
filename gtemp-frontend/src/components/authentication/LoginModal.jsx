import { useState } from "react";
import "../../static/LoginModal.css";

export default function LoginModal({ onClose, onLoginSuccess, onSwitchToCreateAccount }) {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!usernameOrEmail || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/users");
      const users = await response.json();

      const user = users.find(
        (u) => u.username === usernameOrEmail || u.email === usernameOrEmail
      );

      if (user && user.password === password) { // plaintext for now; hash later for production
        onLoginSuccess(user.username);
        setUsernameOrEmail("");
        setPassword("");
        onClose();
      } else {
        setError("Invalid username/email or password");
      }
    } catch (err) {
      setError("Server error");
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
