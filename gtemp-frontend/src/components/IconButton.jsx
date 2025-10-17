import React from 'react';
import '../styles/IconButton.css';

const IconButton = ({ imgSrc, name }) => {
  return (
    <button className="icon-button btn btn-light text-dark" title={name}>
      <img src={imgSrc} alt={name} className="icon-img" />
      <span className="icon-label">{name}</span>
      
    </button>
  );
};

export default IconButton;
