import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProfileDropDown from '../ProfileDropDown';
import logoImage from '../../assets/logo.png';
import LoginModal from '../authentication/LoginUser';
import SearchBar from '../Search/SearchBar';
import RegisterModal from '../RegisterModal';
import './Header.css';

export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { currentUser, logout, loading } = useAuth();

  const isLoggedIn = !!currentUser;
  const username = currentUser?.username;

  const handleOpenLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = () => {
    handleCloseModals();
  };

  const handleAuthAction = () => {
    if (isLoggedIn) {
      logout();
    } else {
      handleOpenLogin();
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <a href="/" className="brand-link">
            <img src={logoImage} alt="Gtemp.io Logo" className="header-logo" />
            <span className="logo-text">Gtemp.io</span>
          </a>
        </div>

        <div className="header-search">
          <SearchBar className="header-search-bar" />
        </div>

        <div className="header-actions">
          <ProfileDropDown
            isLoggedIn={isLoggedIn}
            username={username}
            wallet={currentUser?.wallet}
            onLoginClick={handleAuthAction}
            onLogout={logout}
            isLoading={loading}
          />
        </div>
      </div>

      {isLoginModalOpen && (
        <LoginModal 
          onClose={handleCloseModals}
          onSwitchToCreateAccount={handleSwitchToRegister}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {isRegisterModalOpen && (
        <RegisterModal 
          onClose={handleCloseModals}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </header>
  );
}