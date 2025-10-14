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

  const innerInnerTabs = ["Inner-inner 1", "Inner-inner 2"];

  const tabsStyle = { display: "flex", backgroundColor: "#ffcccc" };
  const tabStyle = (tabNumber) => ({
    flex: 1,
    padding: "10px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: activeInnerTab === tabNumber ? "#ff6666" : "#ffcccc",
    fontWeight: activeInnerTab === tabNumber ? "bold" : "normal",
  });

  const innerContentStyle = {
    marginTop: "10px",
    backgroundColor: "#ff9999",
    width: "80%",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: "8px",
    padding: "20px",
  };

  return (
    <div className="inner-container" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
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
          <div
            style={{
              display: "flex",
              width: "100%",
              flex: 1,
              overflowY: "auto",
              justifyContent: "space-between", // Pushes panels to edges
              padding: "0 20px", // Adds horizontal padding to container
              gap: "40px", // Extra gap between panels
            }}
          >
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