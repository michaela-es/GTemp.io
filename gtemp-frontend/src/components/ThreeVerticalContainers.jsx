// ThreeVerticalContainers.jsx
import { useState } from 'react';
import '../static/ThreeVerticalContainers.css';
import FirstContainer from './FirstContainer';

// Modals
import LoginModal from './LoginModal';
import CreateAccountModal from './CreateAccountModal';
import UserSection from './UserSection'; // ✅ Import

// Assets
import searchIcon from '../assets/search-icon.svg';
import logoImage from '../assets/logo.png';
import filterIcon from '../assets/filter-icon.svg';
import dropDownIcon from '../assets/drop-down.svg';

export default function ThreeVerticalContainers() {
  const [selectedPrice, setSelectedPrice] = useState('any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [taggedOpen, setTaggedOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [selectedTagged, setSelectedTagged] = useState('Engine');
  const [selectedType, setSelectedType] = useState('Type');

  const [activeModal, setActiveModal] = useState(null); 

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleCheckboxChange = (value) => {
    setSelectedPrice(value);
    setMinPrice('');
    setMaxPrice('');
  };

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    if (type === 'min') setMinPrice(value);
    else setMaxPrice(value);
    if (value !== '') setSelectedPrice('');
  };

  const handleTaggedSelect = (value) => {
    setSelectedTagged(value);
    setTaggedOpen(false);
  };

  const handleTypeSelect = (value) => {
    setSelectedType(value);
    setTypeOpen(false);
  };

  const handleLoginSuccess = (enteredUsername) => {
    setIsLoggedIn(true);
    setUsername(enteredUsername);
    setActiveModal(null);
  };

  // ✅ Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <div className="container">
      {/* FIRST CONTAINER */}
      <FirstContainer
        isLoggedIn={isLoggedIn}
        username={username}
        onLoginClick={() => setActiveModal('login')}
        onLogout={handleLogout}
    />


      {/* SECOND CONTAINER */}
      <div className="box box2">
        <div className="filter-wrapper">
          {/* === TOP ROW: TAGGED + TYPE === */}
          <div className="top-filters">
            {/* === Tagged Dropdown === */}
            <div className="dropdown-pair">
              <span className="top-label">Tagged</span>
              <div className="dropdown-wrapper">
                <button
                  className="top-dropdown"
                  onClick={() => setTaggedOpen(!taggedOpen)}
                >
                  {selectedTagged}
                  <img
                    src={dropDownIcon}
                    alt="Drop"
                    className="top-dropdown-icon"
                  />
                </button>

                {taggedOpen && (
                  <div className="top-dropdown-content">
                    {['Roblox Studio', 'Unity3D', 'Unreal Engine', 'Godot'].map(
                      (item) => (
                        <div
                          key={item}
                          className="dropdown-option"
                          onClick={() => handleTaggedSelect(item)}
                        >
                          {item}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* === Type Dropdown === */}
            <div className="dropdown-pair">
              <span className="top-label">Type</span>
              <div className="dropdown-wrapper">
                <button
                  className="top-dropdown"
                  onClick={() => setTypeOpen(!typeOpen)}
                >
                  {selectedType}
                  <img
                    src={dropDownIcon}
                    alt="Drop"
                    className="top-dropdown-icon"
                  />
                </button>

                {typeOpen && (
                  <div className="top-dropdown-content">
                    {[
                      'Action',
                      'Adventure',
                      'RPG',
                      'RTS / Diplomacy',
                      'Street Fight & Platformer',
                      'Board Games',
                      'Systems (raycast/movement/etc..)',
                    ].map((item) => (
                      <div
                        key={item}
                        className="dropdown-option"
                        onClick={() => handleTypeSelect(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* === BOTTOM ROW: FILTERS === */}
          <div className="filter-bar">
            <div className="filter-item">
              <img src={filterIcon} alt="Filter" className="filter-icon" />
              <span className="filter-text">Popular</span>
            </div>

            <span className="filter-text">Recently Published</span>
            <span className="filter-text">Top Rated</span>

            {/* Price Range Dropdown */}
            <div className="filter-item dropdown">
              <span className="filter-text">Price Range</span>
              <img src={dropDownIcon} alt="Drop Down" className="filter-icon" />

              <div className="dropdown-content">
                <div className="dropdown-row">
                  <span>Any Price</span>
                  <input
                    type="checkbox"
                    checked={selectedPrice === 'any'}
                    onChange={() => handleCheckboxChange('any')}
                  />
                </div>
                <div className="dropdown-row">
                  <span>High to Low</span>
                  <input
                    type="checkbox"
                    checked={selectedPrice === 'high'}
                    onChange={() => handleCheckboxChange('high')}
                  />
                </div>
                <div className="dropdown-row">
                  <span>Low to High</span>
                  <input
                    type="checkbox"
                    checked={selectedPrice === 'low'}
                    onChange={() => handleCheckboxChange('low')}
                  />
                </div>
                <div className="dropdown-row">
                  <input
                    type="number"
                    placeholder="Min"
                    className="price-input"
                    min="0"
                    value={minPrice}
                    onChange={(e) => handleInputChange(e, 'min')}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="price-input"
                    min="0"
                    value={maxPrice}
                    onChange={(e) => handleInputChange(e, 'max')}
                  />
                </div>
                <div className="dropdown-row">
                  <button className="apply-button">Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* THIRD CONTAINER */}
      <div className="box box3"></div>
      {activeModal === 'login' && (
        <LoginModal
          onClose={() => setActiveModal(null)}
          onSwitchToCreateAccount={() => setActiveModal('create')}
          onLoginSuccess={handleLoginSuccess} // ✅ Pass down handler
        />
      )}

      {/* CREATE ACCOUNT MODAL */}
      {activeModal === 'create' && (
        <CreateAccountModal
          onClose={() => setActiveModal(null)}
          onSwitchToLogin={() => setActiveModal('login')}
        />
      )}
  
    </div>
  );
}
