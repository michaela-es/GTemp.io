//InnerContainer2.jsx
import React, { useState, useEffect } from "react";
import { ItemWithStats } from "../DataComponents/Dashboards/Projects/DashboardProjectStats"; // import the combined container
import RightPanel from "../DataComponents/Dashboards/Edit Project/RightPanel"; // adjust path if needed
import LeftPanel from "../DataComponents/Dashboards/Edit Project/LeftPanel"; // adju  st path if needed

const InnerContainer2 = ({ activeInnerTab: propActiveInnerTab }) => {
  const [activeInnerTab, setActiveInnerTab] = useState(propActiveInnerTab || 1);

  useEffect(() => {
    if (propActiveInnerTab) setActiveInnerTab(propActiveInnerTab);
  }, [propActiveInnerTab]);

  const innerInnerTabs = ["Creation Statistics", "Create New Project"];

  const tabsStyle = { display: "flex", backgroundColor: "#ffcccc" };
  const tabStyle = (tabNumber) => ({
    flex: 1, // each tab takes equal width
    padding: "2px 0",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    color: activeInnerTab === tabNumber ? "#d90000" : "#000000",
    fontWeight: activeInnerTab === tabNumber ? "bold" : "normal",
    border: "1px solid #ccc",
    borderBottom: activeInnerTab === tabNumber ? "2px solid #d90000" : "1px solid #ccc",
    margin: "0",
    borderRadius: "0",
    boxSizing: "border-box",
  });

  const innerContentStyle = {
    backgroundColor: "#ff9999",
    width: "100%", // full width inside the container
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "10px 0px",
    boxSizing: "border-box",
    overflowX: "hidden",
  };

  return (
    <div className="inner-container" style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        margin: "0 250px",
        minWidth: 0,
        overflowX: "hidden",
      }}>
      {/* Tabs */}
      <div style={tabsStyle}>
        {innerInnerTabs.map((label, index) => (
          <div
            key={index}
            style={tabStyle(index + 1)}
            onClick={() => setActiveInnerTab(index + 1)}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={innerContentStyle}>
        {activeInnerTab === 1 && (
          <ItemWithStats
            itemProps={{
              image: "https://i.ytimg.com/vi/rvZ1NWNkYcY/maxresdefault.jpg",
              title: "Sample Item",
              price: "Free",
              releaseDate: "01/01/2025",
              updateDate: "10/09/2025",
            }}
            onEdit={() => setActiveInnerTab(2)}
          />
        )}

        {activeInnerTab === 2 && (
          <div style={{ display: "flex"}}>
            {/* Left Panel */}
            <div style={{ flex: 1 }}>
              <LeftPanel />
            </div>

            {/* Right Panel */}
            <div style={{ flex: 1 }}>
              <RightPanel />
            </div>
          </div>
        )}




      </div>
    </div>
  );
};

export default InnerContainer2;