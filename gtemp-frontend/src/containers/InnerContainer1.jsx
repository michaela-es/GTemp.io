import React, { useState } from "react";
import RatingsView from "../DataComponents/MyLibrary/RatedViewed";
import PurchasesView from "../DataComponents/MyLibrary/DownloadedPurchased";
import WishlistView from "../DataComponents/MyLibrary/Wishlisted";

const InnerContainer1 = () => {
  const [activeInnerTab, setActiveInnerTab] = useState(1);
  const innerInnerTabs = ["Ratings", "Purchases", "Wishlist"];

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
        alignItems: "center",
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
