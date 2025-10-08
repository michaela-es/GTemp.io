import { useState } from "react";
import "./UserSection.css";
import profileIcon from "./assets/profile-icon.svg";
import dropDownIcon from "./assets/drop-down.svg";

export default function UserSection({ isLoggedIn, username, onLoginClick, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="right-section">
      {!isLoggedIn ? (
        <button className="login-button" onClick={onLoginClick}>
          Log in
        </button>
      ) : (
        <div className="user-section" onClick={() => setMenuOpen(!menuOpen)}>
          <img src={profileIcon} alt="Profile" className="user-icon" />
          <span className="username">{username}</span>
          <img src={dropDownIcon} alt="Dropdown" className="dropdown-icon" />

          {menuOpen && (
            <div className="user-menu">
              <p>My Library</p>
              <p>Dashboard</p>
              <p>Upload New Project</p>
              <p>Settings</p>
              <p onClick={onLogout}>Log out</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
