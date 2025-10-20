import React, { useState } from 'react';
import ActionButton from './ActionButton';
import SearchBar from './SearchBar';
import HeadingText from './HeadingText';
import { RegisterModal } from './RegisterModal';
import { LoginModal } from './LoginModal';
import { useAuth } from '../contexts/UserContext';
import '../styles/HeaderBar.css';
import UserMenu from './UserMenu'; 
 
const HeaderBar = ({ headingText = "GTemp.io" }) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user: currentUser, login, logout } = useAuth();

  const handleOpenLogin = () => {
    setIsLoginModalOpen(true); 
  };

  const handleCloseModals = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
  };

  const handleRegister = async (formData) => {
    try {
      console.log('Registration data:', formData);
      alert('Registration would happen here');
      handleCloseModals();
    } catch (error) {
      console.error('Registration failed:', error);
      alert(`Registration failed: ${error.message}`);
    }
  };

  const handleLogin = async (formData) => {
    try {
      const success = login(formData.email, formData.password);
      if (success) {
        console.log('Login successful!');
        handleCloseModals();
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
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
        {currentUser ? (
          <UserMenu user={currentUser} onLogout={logout} />
        ) : (
          <ActionButton 
            name="Log In" 
            onClick={handleOpenLogin} 
          />
        )}
      </div>

      <RegisterModal 
        isOpen={isRegisterModalOpen}
        onClose={handleCloseModals}
        onRegister={handleRegister}
        onSwitchToLogin={handleSwitchToLogin}
      />

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={handleCloseModals}
        onSwitchToRegister={handleSwitchToRegister}
      />
    </div>
  );
};

export default HeaderBar;