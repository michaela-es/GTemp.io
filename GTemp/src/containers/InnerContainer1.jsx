import React, { useState } from "react";
import RatingsView from "../DataComponents/MyLibrary/RatedViewed";
import PurchasesView from "../DataComponents/MyLibrary/DownloadedPurchased";
import WishlistView from "../DataComponents/MyLibrary/Wishlisted";
import { ItemWithStats } from "../DataComponents/Dashboards/Projects/DashboardProjectStats"; // import the combined container
import RightPanel from "../DataComponents/Dashboards/Edit Project/RightPanel"; // adjust path if needed
import LeftPanel from "../DataComponents/Dashboards/Edit Project/LeftPanel"; // adju  st path if needed

const InnerContainer1 = () => {
  const [activeInnerTab, setActiveInnerTab] = useState(1);
  const innerInnerTabs = ["Rated & Viewed", "Downloaded & Purchased", "Wishlisted"];

  const tabsStyle = { display: "flex", width: "100%" };

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
    borderRadius: "8px",
    padding: "10px 20px",
    boxSizing: "border-box",
  };

  return (
    <div
      className="inner-container"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        margin: "0 250px", // horizontal margin
      }}
    >
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
        {activeInnerTab === 1 && <RatingsView />}
        {activeInnerTab === 2 && <PurchasesView />}
        {activeInnerTab === 3 && <WishlistView />}
      </div>
    </div>
  );
};

export default InnerContainer1;
