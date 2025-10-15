import React from 'react';
import { useSearch } from '../contexts/SearchContext';
import ActionButton from './ActionButton';
import SearchBar from './SearchBar';
import HeadingText from './HeadingText';
import '../styles/HeaderBar.css';

const HeaderBar = ({ headingText = "GTemp.io" }) => {

  const handleActionClick = () => {
    console.log('Log In clicked!');
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
        <ActionButton name="Log In" onClick={handleActionClick} />
      </div>
    </div>
  );
};

export default HeaderBar;
