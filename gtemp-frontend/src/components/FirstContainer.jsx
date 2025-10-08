// FirstContainer.js
import React from 'react';
import UserSection from './UserSection';
import searchIcon from '../assets/search-icon.svg';
import logoImage from '../assets/logo.png';

export default function FirstContainer({ 
  isLoggedIn, 
  username, 
  onLoginClick, 
  onLogout 
}) {
  return (
    <div className="box box1">
      <div className="left-section">
        <img src={logoImage} alt="Logo" className="logo" />
        <span className="site-name">Gtemp.io</span>
      </div>

      <div className="middle-section">
        <div className="search-box">
          <input type="text" placeholder="search here." />
          <button className="search-button">
            <img src={searchIcon} alt="Search" className="search-icon" />
          </button>
        </div>
      </div>

      <UserSection
        isLoggedIn={isLoggedIn}
        username={username}
        onLoginClick={onLoginClick}
        onLogout={onLogout}
      />
    </div>
  );
}
