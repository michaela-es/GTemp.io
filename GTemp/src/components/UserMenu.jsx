// components/UserMenu.jsx
import React, { useState, useRef, useEffect } from 'react';
import HeadingDropDown from './HeadingDropDown';

const UserMenu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
  {
    heading: 'EXPLORE',
    items: [{ label: 'My Library', href: '/library', type: 'link' }],
  },
  {
    heading: 'CREATE',
    items: [
      { label: 'Dashboard', href: '/dashboard', type: 'link' },
      { label: 'Upload New Project', href: '/upload', type: 'link' },
    ],
  },
  {
    heading: 'ACCOUNT',
    items: [
      { label: 'Settings', href: '/settings', type: 'link' },
      { label: 'Log out', onClick: onLogout, type: 'button' },
    ],
  },
];


  return (
    <div className="user-menu" ref={menuRef}>
      <div className="user-info" onClick={toggleMenu}>
        <img className="avatar" src={user.avatar || '/default-avatar.png'} alt="avatar" />
        <span className="username">{user.username}</span>
        <span className="arrow">▼</span>
      </div>

      {isOpen && (
        <div className="dropdown-wrapper">
          <HeadingDropDown menuItems={menuItems} />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
