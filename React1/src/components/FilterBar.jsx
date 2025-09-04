import React from "react";
import Subheading from "./Subheading.jsx";  
import Dropdown from "./Dropdown.jsx";
import "./FilterBar.css";

function FilterBar({ tags = [], types = [], onTagSelect, onTypeSelect }) {
  return (
    <div className="filter-bar">
      <Subheading className="filter-label">Game Tags</Subheading>
      <Dropdown label="Select Tag" options={tags} onSelect={onTagSelect} />
      <Subheading className="filter-label">Game Types</Subheading>
      <Dropdown label="Select Type" options={types} onSelect={onTypeSelect} />
    </div>
  );
}

export default FilterBar;
