import React from 'react';
import '../styles/ActionButton.css';

const ActionButton = ({ name, onClick }) => {
  return (
    <button className="action-button" onClick={onClick}>
      <span>{name}</span>
    </button>
  );
};

export default ActionButton;