import React, { useState } from "react";
import filterIcon from "../assets/filter-icon.svg";

const InnerContainer1 = () => {
  const [activeInnerTab, setActiveInnerTab] = useState(1);
  const [rating, setRating] = useState("Any Rating");

  const innerInnerTabs = ["Inner-inner 1", "Inner-inner 2", "Inner-inner 3"];

  const tabsStyle = { display: "flex", backgroundColor: "#ffcccc" };
  const tabStyle = (tabNumber, currentActive) => ({
    flex: 1,
    padding: "10px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: currentActive === tabNumber ? "#ff6666" : "#ffcccc",
    fontWeight: currentActive === tabNumber ? "bold" : "normal",
  });

  const innerContentStyle = {
    marginTop: "10px",
    backgroundColor: "#fff3e0",
    width: "80%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    padding: "10px 20px",
    boxSizing: "border-box",
  };

  const topRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };

  const filterStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "bold",
    fontSize: "1.2rem",
  };

  const boxStyle = (bgColor) => ({
    width: "80px",
    height: "80px",
    backgroundColor: bgColor,
    color: "white",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "1rem",
  });

  return (
    <div
      className="inner-container"
      style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}
    >
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
        {/* Inner-inner 1 */}
        {activeInnerTab === 1 && (
          <>
            <div style={topRowStyle}>
              <div style={filterStyle}>
                <img src={filterIcon} alt="Filter" style={{ width: "30px", height: "30px" }} />
                <span>Filter</span>
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
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <span>Inner-inner 1 content goes here</span>
            </div>
          </>
        )}

        {/* Inner-inner 2 */}
        {activeInnerTab === 2 && (
          <>
            <div style={topRowStyle}>
              {/* Left: Filter + dropdown */}
              <div style={filterStyle}>
                <img src={filterIcon} alt="Filter" style={{ width: "30px", height: "30px" }} />
                <span>Filter</span>
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
                  <option>Any Paid Amount</option>
                  <option>Most to Least Paid Ammount</option>
                  <option>Least to Most Paid Ammount</option>
                </select>
              </div>

              {/* Right: Downloaded / Purchased */}
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
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <span>Inner-inner 2 content goes here</span>
            </div>
          </>
        )}

        {/* Inner-inner 3 */}
        {activeInnerTab === 3 && (
          <>
            <div style={topRowStyle}>
            {/* Empty left space */}
            <div></div>

            {/* Right: Wishlist */}
            <div style={{ display: "flex", gap: "20px" }}>
                <div style={boxStyle("blue")}>
                <div style={{ fontSize: "1.5rem" }}>0</div>
                <div>Wishlisted</div>
                </div>
            </div>
            </div>

            {/* Content below top row */}
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <span>Inner-inner 3 content goes here</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InnerContainer1;
