import React, { useState } from "react";
import "./Dropdown.css";

function Dropdown({ label, options = [], onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-btn" onClick={toggleOpen}>
        {selected} <span className={`arrow ${isOpen ? "up" : "down"}`}>▼</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((opt) => (
            <li key={opt} onClick={() => handleSelect(opt)} className="dropdown-item">
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
