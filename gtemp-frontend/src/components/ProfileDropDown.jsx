import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../static/ProfileDropDown.css";
import profileIcon from "../assets/profile-icon.svg";
import dropDownIcon from "../assets/drop-down.svg";
import { useAuth } from "../context/AuthContext";

export default function ProfileDropDown({ 
  isLoggedIn, 
  username, 
  wallet,
  onLoginClick, 
  onLogout,
  isLoading = false 
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const walletValue = wallet !== undefined ? wallet : currentUser?.wallet;

  if (!isLoggedIn) {
    return (
      <div className="right-section">
        <button 
          className="login-button" 
          onClick={onLoginClick}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Log in"}
        </button>
      </div>
    );
  }

  const toggleMenu = () => {
    if (!isLoading) {
      setMenuOpen(!menuOpen);
    }
  };

  const handleItemClick = (action) => {
    action();
    setMenuOpen(false);
  };

  return (
    <div className="right-section" ref={dropdownRef}>
      <div 
        className={`user-section ${isLoading ? 'disabled' : ''}`} 
        onClick={toggleMenu}
      >
        <img src={profileIcon} alt="Profile" className="user-icon" />
        <span className="username">
          {username}
          {walletValue !== undefined && (
            <span className="wallet">
              ${walletValue.toFixed(2)}
            </span>
          )}
        </span>
        <img 
          src={dropDownIcon} 
          alt="Dropdown" 
          className={`dropdown-icon ${menuOpen ? 'open' : ''}`} 
        />

        {menuOpen && (
          <div className="user-menu">
            {menuItems.map((item) => (
              <p 
                key={item.label} 
                onClick={() => handleItemClick(item.action)}
                className={item.label === "Log out" ? "logout-item" : ""}
              >
                {item.label}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}