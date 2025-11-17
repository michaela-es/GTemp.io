// UserSection.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../static/ProfileDropDown.css";
import profileIcon from "../assets/profile-icon.svg";
import dropDownIcon from "../assets/drop-down.svg";

export default function ProfileDropDown({ isLoggedIn, username, onLoginClick, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Navigate to dashboard with outer + inner tab state
  const goToInnerContainer = (container, innerTab) => {
    navigate("/dashboard", { state: { container, subContainer: innerTab } });
    setMenuOpen(false);
  };

  // Menu items mapped to correct tabs
  const menuItems = [
    { label: "My Library", action: () => goToInnerContainer(1, 1) },          // InnerContainer1 / InnerInner1
    { label: "Dashboard", action: () => goToInnerContainer(2, 1) },           // InnerContainer2 / InnerInner1
    { label: "Upload New Project", action: () => goToInnerContainer(2, 2) },  // InnerContainer2 / InnerInner2
    { label: "Settings", action: () => goToInnerContainer(3, 1) },            // InnerContainer3 / InnerInner1
    { label: "Log out", action: onLogout },
  ];

  if (!isLoggedIn) {
    return (
      <div className="right-section">
        <button className="login-button" onClick={onLoginClick}>
          Log in
        </button>
      </div>
    );
  }

  return (
    <div className="right-section">
      {/* Profile Dropdown */}
      <div className="user-section" onClick={() => setMenuOpen(!menuOpen)}>
        <img src={profileIcon} alt="Profile" className="user-icon" />
        <span className="username">{username}</span>
        <img src={dropDownIcon} alt="Dropdown" className="dropdown-icon" />

        {menuOpen && (
          <div className="user-menu">
            {menuItems.map((item) => (
              <p key={item.label} onClick={item.action}>
                {item.label}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
