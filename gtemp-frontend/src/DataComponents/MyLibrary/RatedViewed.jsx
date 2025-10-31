// FilteredRatingsView.jsx
import React, { useState } from "react";
import filterIcon from "../../assets/filter-icon.svg";
import ProjectItem from "./ProjectItem";
import {
  topRowStyle,
  filterStyle,
  boxStyle,
  dropdownContainer,
  dropdownButton,
  dropdownMenu,
  dropdownItem,
  dropdownItemHover,
} from "./styles";

const RatedViewed = () => {
  const [rating, setRating] = useState("Any Rating");
  const [isOpen, setIsOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const ratingOptions = ["Any Rating", "5 Star", "4 Star", "3 Star", "2 Star", "1 Star"];

  const handleSelect = (value) => {
    setRating(value);
    setIsOpen(false);
  };

  return (
    <>
      <div style={topRowStyle}>
        <div style={filterStyle}>
          <img src={filterIcon} alt="Filter" style={{ width: 30, height: 30 }} />
          <span>Filters</span>

          {/* Custom dropdown */}
          <div
            style={dropdownContainer}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div
              style={dropdownButton}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {rating} ▼
            </div>

            {isOpen && (
              <div style={dropdownMenu}>
                {ratingOptions.map((option, i) => (
                  <div
                    key={option}
                    style={{
                      ...dropdownItem,
                      ...(hoverIndex === i ? dropdownItemHover : {}),
                    }}
                    onMouseEnter={() => setHoverIndex(i)}
                    onMouseLeave={() => setHoverIndex(null)}
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <div style={boxStyle("white")}>
            <div style={{ fontSize: "1.5rem" }}>0</div>
            <div>Rated</div>
          </div>
          <div style={boxStyle("white")}>
            <div style={{ fontSize: "1.5rem" }}>0</div>
            <div>Commented</div>
          </div>
        </div>
      </div>

      {/* Project Item */}
      <ProjectItem
        title="Awesome Game"
        timeAgo="2 hours ago"
        initialRating={3}
        comment="Loved the story mode!"
      />
    </>
  );
};

export default RatedViewed;
