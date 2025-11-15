import { useState } from "react";
import "../../static/CreateAccountModal.css";

export default function CreateAccountModal({ onClose, onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleCreateAccount = async () => {
    setError("");

    if (!username || !password || !email) {
      setError("All fields are required");
      return;
    }
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        alert("Account created successfully!");
        onClose();
        onSwitchToLogin();
      } else {
        const data = await response.json();
        setError(data.message || "Error creating account");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Create Account</h2>

        <div className="modal-field">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        <div className="modal-field">
          <label>Repeat Password</label>
          <input
            type="password"
            placeholder="Repeat password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>

        <div className="modal-field">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="tos-container">
          <input type="checkbox" id="tos" />
          <label htmlFor="tos">
            I accept the <span className="link">Terms of Service</span> and the{" "}
            <span className="link">Terms and Conditions</span>.
          </label>
        </div>

        <button className="modal-login-button" onClick={handleCreateAccount}>
          Create Account
        </button>

        <div className="modal-footer">
          <label>or already have an account?</label>
          <p className="modal-link" onClick={onSwitchToLogin}>
            Log in
          </p>
        </div>

        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
