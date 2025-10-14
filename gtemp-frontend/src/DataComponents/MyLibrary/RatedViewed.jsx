// FilteredRatingsView.jsx
import React, { useState } from "react";
import filterIcon from "../../assets/filter-icon.svg";
import ProjectItem from "./ProjectItem";
import { topRowStyle, filterStyle, boxStyle } from "./styles";

const RatedViewed = () => {
  const [rating, setRating] = useState("Any Rating");

  return (
    <>
      <div style={topRowStyle}>
        <div style={filterStyle}>
          <img src={filterIcon} alt="Filter" style={{ width: 30, height: 30 }} />
          <span>Rated & Viewed</span>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            <option>Any Rating</option>
            <option>5 Star</option>
            <option>4 Star</option>
            <option>3 Star</option>
            <option>2 Star</option>
            <option>1 Star</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <div style={boxStyle("blue")}>
            <div style={{ fontSize: "1.5rem" }}>0</div>
            <div>Rate</div>
          </div>
          <div style={boxStyle("green")}>
            <div style={{ fontSize: "1.5rem" }}>0</div>
            <div>Comment</div>
          </div>
        </div>
      </div>

      {/* Use item component */}
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
