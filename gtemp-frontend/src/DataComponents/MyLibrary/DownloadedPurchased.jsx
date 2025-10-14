// PurchasesView.jsx
import React, { useState } from "react";
import filterIcon from "../../assets/filter-icon.svg";
import ProjectItem from "./ProjectItem";
import { topRowStyle, filterStyle, boxStyle } from "./styles";

const DownloadedPurchased = () => {
  const [sort, setSort] = useState("Any Paid Amount");

  return (
    <>
      <div style={topRowStyle}>
        <div style={filterStyle}>
          <img src={filterIcon} alt="Filter" style={{ width: 30, height: 30 }} />
          <span>Doawnloaded & Purchased</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            <option>Any Paid Amount</option>
            <option>Most to Least Paid Amount</option>
            <option>Least to Most Paid Amount</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <div style={boxStyle("purple")}>
            <div style={{ fontSize: "1.5rem" }}>0</div>
            <div>Downloaded</div>
          </div>
          <div style={boxStyle("orange")}>
            <div style={{ fontSize: "1.5rem" }}>0</div>
            <div>Purchased</div>
          </div>
        </div>
      </div>

      <ProjectItem
        title="Awesome Game"
        timeAgo="2 hours ago"
        initialRating={3}
        comment="Loved the story mode!"
      />

      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <span>Purchase history will appear here</span>
      </div>
    </>
  );
};

export default DownloadedPurchased;
