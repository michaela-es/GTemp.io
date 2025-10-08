import React, { useState } from "react";

const InnerContainer3 = () => {
  const [activeInnerTab, setActiveInnerTab] = useState(1);
  const innerInnerTabs = ["Inner-inner 1", "Inner-inner 2"];

  const tabsStyle = { display: "flex", backgroundColor: "#ffcccc" };
  const tabStyle = (tabNumber, currentActive) => ({
    flex: 1,
    padding: "10px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: currentActive === tabNumber ? "#ff6666" : "#ffcccc",
    fontWeight: currentActive === tabNumber ? "bold" : "normal",
  });

  const contentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    color: "white",
    fontSize: "20px",
    paddingTop: "20px",
    width: "100%",
  };

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
            style={tabStyle(index + 1, activeInnerTab)}
            onClick={() => setActiveInnerTab(index + 1)}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Inner-Inner Content */}
      <div style={innerContentStyle}>
        <div>Content {activeInnerTab} (Outer 3)</div>
      </div>
    </div>
  );
};

export default InnerContainer3;
