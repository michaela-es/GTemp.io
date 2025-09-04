import React from "react";
import Subheading from "./Subheading.jsx";  
import Dropdown from "./Dropdown.jsx";
import "./FilterBar.css"; 
import "./Dropdown.css";  

function FilterBar({ tags = [], types = [], onTagSelect, onTypeSelect }) {
  return (
    <div className="filter-bar">
      <div className="filter-section">
        <Subheading>Game Tags</Subheading>
        <Dropdown label="Select Tag" options={tags} onSelect={onTagSelect} />
      </div>
      <div className="filter-section">
        <Subheading>Game Types</Subheading>
        <Dropdown label="Select Type" options={types} onSelect={onTypeSelect} />
      </div>
    </div>
  );
}

export default FilterBar;
