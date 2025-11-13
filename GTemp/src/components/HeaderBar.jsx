import React, { useState } from 'react';
import { useSearch } from '../contexts/SearchContext';
import { useAuth } from '../contexts/AuthContext';
import ActionButton from './ActionButton';
import SearchBar from './SearchBar';
import HeadingText from './HeadingText';
import { RegisterModal } from './RegisterModal';
import { LoginModal } from './LoginModal';
import '../styles/HeaderBar.css';

const HeaderBar = ({ headingText = "GTemp.io" }) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { currentUser, logout, login, loading } = useAuth(); 
  const handleOpenLogin = () => {
    setIsLoginModalOpen(true); 
  };

  const handleCloseModals = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
  };


  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const getButtonText = () => {
    if (currentUser) {
      return `Logout (${currentUser.username})`; // Now uses real user data
    }
    return "Log In";
  };

    const handleLogin = async (formData) => {
    try {
      await login(formData);
      handleCloseModals();
    } catch (err) {
      console.error("Login failed:", err);
      alert(err.message || "Login failed");
    }
  };


  const handleAuthClick = () => {
    if (currentUser) {
      logout();
    } else {
      handleOpenLogin();
    }
  };

  return (
    <div className="header-bar">
      <div className="header-bar__heading">
        <HeadingText text={headingText} />
      </div>

      <div className="header-bar__search">
        <SearchBar />
      </div>

      <div className="header-bar__action">
        <ActionButton 
          name={getButtonText()} 
          onClick={handleAuthClick}
          disabled={loading}
        />
      </div>

      <RegisterModal 
        isOpen={isRegisterModalOpen}
        onClose={handleCloseModals}
        onSwitchToLogin={handleSwitchToLogin}
      />

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={handleCloseModals}
        onLogin={handleLogin} 
        onSwitchToRegister={handleSwitchToRegister}
      />
    </div>
  );
};

export default HeaderBar;