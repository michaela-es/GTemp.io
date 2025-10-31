// PurchasesView.jsx
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

const DownloadedPurchased = () => {
  const [sort, setSort] = useState("Any Paid Amount");
  const [isOpen, setIsOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const sortOptions = [
    "Any Paid Amount",
    "Most to Least Paid Amount",
    "Least to Most Paid Amount",
  ];

  const handleSelect = (value) => {
    setSort(value);
    setIsOpen(false);
  };

  return (
    <>
      <div style={topRowStyle}>
        <div style={filterStyle}>
          <img src={filterIcon} alt="Filter" style={{ width: 30, height: 30 }} />
          <span>Filters</span>

          {/* 🔹 Custom dropdown same as RatedViewed */}
          <div
            style={dropdownContainer}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div
              style={dropdownButton}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {sort} ▼
            </div>

            {isOpen && (
              <div style={dropdownMenu}>
                {sortOptions.map((option, i) => (
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
            <div>Downloaded</div>
          </div>
          <div style={boxStyle("white")}>
            <div style={{ fontSize: "1.5rem" }}>0</div>
            <div>Purchased</div>
          </div>
        </div>
      </div>

      {/* Example Project Item */}
      <ProjectItem
        title="Awesome Game"
        timeAgo="2 hours ago"
        initialRating={3}
        comment="Loved the story mode!"
      />

      {/* Placeholder message */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span>Purchase history will appear here</span>
      </div>
    </>
  );
};

export default DownloadedPurchased;
