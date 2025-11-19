// ThreeVerticalContainers.jsx
import { useState, useEffect } from 'react';
import '../../static/Body.css';
import FirstContainer from './Header';
import TemplateGrid from '../TemplateGrid';
import useLoadData from '../../hooks/useLoadData';

// Modals
import LoginUser from '../authentication/LoginUser';
import RegisterUser from '../authentication/RegisterUser';
import ProfileDropDown from '../ProfileDropDown'; // ✅ Import

// Assets
import searchIcon from '../../assets/search-icon.svg';
import logoImage from '../../assets/logo.png';
import filterIcon from '../../assets/filter-icon.svg';
import dropDownIcon from '../../assets/drop-down.svg';

export default function Body() {
  const { data: templates, loading } = useLoadData(); // fetch templates
  const [filteredTemplates, setFilteredTemplates] = useState([]);

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

  // === Filter Handlers ===
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  // === Filter Templates on change ===
  useEffect(() => {
    if (!templates) return;

    let filtered = [...templates];

    // Filter by Tagged (Engine)
    if (selectedTagged !== 'Engine') {
      filtered = filtered.filter(t => t.engine === selectedTagged);
    }

    // Filter by Type
    if (selectedType !== 'Type') {
      filtered = filtered.filter(t => t.type === selectedType);
    }

    // Filter by Price
    if (selectedPrice === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (selectedPrice === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (minPrice || maxPrice) {
      filtered = filtered.filter(t => {
        const price = t.price || 0;
        if (minPrice && price < parseFloat(minPrice)) return false;
        if (maxPrice && price > parseFloat(maxPrice)) return false;
        return true;
      });
    }

    setFilteredTemplates(filtered);
  }, [templates, selectedTagged, selectedType, selectedPrice, minPrice, maxPrice]);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading templates...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      {/* FIRST CONTAINER */}
      <FirstContainer
        isLoggedIn={isLoggedIn}
        username={username}
        onLoginClick={() => setActiveModal('login')}
        onLogout={handleLogout}
      />

      {/* SECOND CONTAINER: STATIC FILTERS */}
      <div className="box box2">
        <div className="filter-wrapper">
          {/* TOP ROW: TAGGED + TYPE */}
          <div className="top-filters">
            <div className="dropdown-pair">
              <span className="top-label">Tagged</span>
              <div className="dropdown-wrapper">
                <button
                  className="top-dropdown"
                  onClick={() => setTaggedOpen(!taggedOpen)}
                >
                  {selectedTagged}
                  <img src={dropDownIcon} alt="Drop" className="top-dropdown-icon" />
                </button>
                {taggedOpen && (
                  <div className="top-dropdown-content">
                    {['Roblox Studio', 'Unity3D', 'Unreal Engine', 'Godot'].map(item => (
                      <div
                        key={item}
                        className="dropdown-option"
                        onClick={() => handleTaggedSelect(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="dropdown-pair">
              <span className="top-label">Type</span>
              <div className="dropdown-wrapper">
                <button
                  className="top-dropdown"
                  onClick={() => setTypeOpen(!typeOpen)}
                >
                  {selectedType}
                  <img src={dropDownIcon} alt="Drop" className="top-dropdown-icon" />
                </button>
                {typeOpen && (
                  <div className="top-dropdown-content">
                    {['Action','Adventure','RPG','RTS / Diplomacy','Street Fight & Platformer','Board Games','Systems (raycast/movement/etc..)'].map(item => (
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

          {/* BOTTOM ROW: Price Filters */}
          <div className="filter-bar">
            <div className="filter-item">
              <img src={filterIcon} alt="Filter" className="filter-icon" />
              <span className="filter-text">Popular</span>
            </div>

            <span className="filter-text">Recently Published</span>
            <span className="filter-text">Top Rated</span>

            <div className="filter-item dropdown">
              <span className="filter-text">Price Range</span>
              <img src={dropDownIcon} alt="Drop Down" className="filter-icon" />
              <div className="dropdown-content">
                <div className="dropdown-row">
                  <span>Any Price</span>
                  <input type="checkbox" checked={selectedPrice==='any'} onChange={()=>handleCheckboxChange('any')} />
                </div>
                <div className="dropdown-row">
                  <span>High to Low</span>
                  <input type="checkbox" checked={selectedPrice==='high'} onChange={()=>handleCheckboxChange('high')} />
                </div>
                <div className="dropdown-row">
                  <span>Low to High</span>
                  <input type="checkbox" checked={selectedPrice==='low'} onChange={()=>handleCheckboxChange('low')} />
                </div>
                <div className="dropdown-row">
                  <input type="number" placeholder="Min" className="price-input" min="0" value={minPrice} onChange={(e)=>handleInputChange(e,'min')} />
                  <input type="number" placeholder="Max" className="price-input" min="0" value={maxPrice} onChange={(e)=>handleInputChange(e,'max')} />
                </div>
                <div className="dropdown-row">
                  <button className="apply-button">Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* THIRD CONTAINER: TEMPLATE GRID */}
      <div className="box box3">
        <TemplateGrid templates={filteredTemplates} />
      </div>

      {/* LOGIN MODAL */}
      {activeModal === 'login' && (
        <LoginUser
          onClose={() => setActiveModal(null)}
          onSwitchToCreateAccount={() => setActiveModal('create')}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* REGISTER MODAL */}
      {activeModal === 'create' && (
        <RegisterUser
          onClose={() => setActiveModal(null)}
          onSwitchToLogin={() => setActiveModal('login')}
        />
      )}
    </div>
  );
}
