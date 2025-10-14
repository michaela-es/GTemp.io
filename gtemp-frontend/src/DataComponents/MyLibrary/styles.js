// DashboardStyles.js

// 🔹 Layout containers
export const tabsStyle = {
  display: "flex",
  backgroundColor: "#ffcccc",
};

export const tabStyle = (activeTab, currentTab) => ({
  flex: 1,
  padding: "10px",
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: activeTab === currentTab ? "#ff6666" : "#ffcccc",
  fontWeight: activeTab === currentTab ? "bold" : "normal",
});

export const innerContentStyle = {
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

// 🔹 Common header layout (used in all inner views)
export const topRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

// 🔹 Filter + dropdown group
export const filterStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontWeight: "bold",
  fontSize: "1.2rem",
};

// 🔹 Info boxes (Rate, Comment, Downloaded, Purchased, etc.)
export const boxStyle = (bgColor) => ({
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
