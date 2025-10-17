import React, { useState } from 'react';
import { useSearch } from '../contexts/SearchContext';
import { useAuth } from '../contexts/AuthContext'; // Add this import!
import ActionButton from './ActionButton';
import SearchBar from './SearchBar';
import HeadingText from './HeadingText';
import { RegisterModal } from './RegisterModal';
import { LoginModal } from './LoginModal';
import '../styles/HeaderBar.css';
import UserMenu from './UserMenu'; 
 
const HeaderBar = ({ headingText = "GTemp.io" }) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { register, login, currentUser, logout, loading, error } = useAuth(); // Now this will work

  const handleOpenLogin = () => {
    setIsLoginModalOpen(true); 
  };

  const handleCloseModals = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
  };

  const handleRegister = async (formData) => {
    try {
      await register(formData);
      console.log('Registration successful!');
      handleCloseModals();
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      alert(`Registration failed: ${error.message}`);
    }
  };

  const handleLogin = async (formData) => {
    try {
      await login(formData);
      console.log('Login successful!');
      handleCloseModals();
      alert('Login successful!');
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

  const getButtonText = () => {
    if (currentUser) {
      return `Logout (${currentUser.username})`;
    }
    return "Log In";
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
          disabled={loading} 
        />
      )}
    </div>

      {/* Modals */}
      <RegisterModal 
        isOpen={isRegisterModalOpen}
        onClose={handleCloseModals}
        onRegister={handleRegister}
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