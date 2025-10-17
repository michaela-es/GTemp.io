// CreateAccountModal.jsx
import '../../static/CreateAccountModal.css';

export default function CreateAccountModal({ onClose, onSwitchToLogin }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Create Account</h2>

        <div className="modal-field">
          <label>Username</label>
          <input type="text" placeholder="Enter username" />
        </div>

        <div className="modal-field">
          <label>Password</label>
          <input type="password" placeholder="Enter password" />
        </div>

        <div className="modal-field">
          <label>Repeat Password</label>
          <input type="password" placeholder="Repeat password" />
        </div>

        <div className="modal-field">
          <label>Email Address</label>
          <input type="email" placeholder="Enter email address" />
        </div>

        <div className="tos-container">
          <input type="checkbox" id="tos" />
          <label htmlFor="tos">
            I accept the <span className="link">Terms of Service</span> and the{' '}
            <span className="link">Terms and Conditions</span>.
          </label>
        </div>

        <button className="modal-login-button">Create Account</button>

        <div className="modal-footer">
          <label>or already have an account?</label>
          <p className="modal-link" onClick={onSwitchToLogin}>
            Log in
          </p>
        </div>

        <button className="modal-close" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}
