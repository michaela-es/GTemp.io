import React from 'react';
import '../styles/ActionButton.css';
const ActionButton = ({name}) => {
  return (
    <button className="action-button">
      <span>{name}</span>
    </button>
  );
};

export default ActionButton;