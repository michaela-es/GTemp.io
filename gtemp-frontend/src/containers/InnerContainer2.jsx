import React, { useState, useEffect } from "react";

const InnerContainer2 = ({ activeInnerTab: propActiveInnerTab }) => {
  const [activeInnerTab, setActiveInnerTab] = useState(propActiveInnerTab || 1);

  // Sync with prop changes from parent
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
    alignItems: "center",
    borderRadius: "8px",
  };

  return (
    <div className="inner-container" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Inner-Inner Tabs */}
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

      {/* Inner-Inner Content */}
      <div style={innerContentStyle}>
        <div>Content {activeInnerTab} (Outer 2)</div>
      </div>
    </div>
  );
};

export default InnerContainer2;
