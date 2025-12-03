import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProfileDropDown from '../ProfileDropDown';
import searchIcon from '../../assets/search-icon.svg';
import logoImage from '../../assets/logo.png';
import LoginModal from '../authentication/LoginUser';
import SearchBar from '../Search/SearchBar';
import RegisterModal from '../RegisterModal';
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
    <div className="box box1">
      <div className="left-section">
        <img src={logoImage} alt="Logo" className="logo" />
        <a href="http://localhost:5173" className="site-name-link">
          <span className="site-name">Gtemp.io</span>
        </a>

      </div>

      <div className="search-container">
              <SearchBar/>
      </div>

      <ProfileDropDown
        isLoggedIn={isLoggedIn}
        username={username}
        wallet={currentUser?.wallet} // <-- add this line
        onLoginClick={handleAuthAction}
        onLogout={logout}
        isLoading={loading}
      />

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
    </div>
  );
}