import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../static/ProfileDropDown.css";
import profileIcon from "../assets/profile-icon.svg";
import dropDownIcon from "../assets/drop-down.svg";
import { useAuth } from "../context/AuthContext";

export default function ProfileDropDown({ isLoggedIn, username, onLoginClick, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const goToInnerContainer = (container, innerTab) => {
    navigate("/dashboard", { state: { container, subContainer: innerTab } });
    setMenuOpen(false);
  };

  const menuItems = [
    { label: "My Library", action: () => goToInnerContainer(1, 1) },
    { label: "Dashboard", action: () => goToInnerContainer(2, 1) },
    { label: "Upload New Project", action: () => goToInnerContainer(2, 2) },
    { label: "Settings", action: () => goToInnerContainer(3, 1) },
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
      <div className="user-section" onClick={() => setMenuOpen(!menuOpen)}>
        <img src={profileIcon} alt="Profile" className="user-icon" />
        <span className="username">
          {username}{" "}
          <span className="wallet">
            {"$ " + (currentUser?.wallet?.toFixed(2) || "0.00")}
          </span>
        </span>
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
