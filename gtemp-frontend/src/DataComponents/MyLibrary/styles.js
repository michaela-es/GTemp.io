// styles.js

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
  width: "100px",
  height: "70px",
  backgroundColor: bgColor,
  color: "black",
  borderRadius: "8px",
  border: "1px solid #d9d9d9",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "1rem",
});

// 🔹 Dropdown styles
export const dropdownContainer = {
  position: "relative",
  display: "inline-block",
};

export const dropdownButton = {
  padding: "8px",
  borderRadius: "3px",
  border: "1px solid #D9D9D9",
  fontSize: "10px",
  backgroundColor: "#fff",
  cursor: "pointer",
  textAlign: "left",
  minWidth: "120px",
};

export const dropdownMenu = {
  position: "absolute",
  top: "100%",
  left: 0,
  width: "100%",
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  borderRadius: "3px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  zIndex: 10,
};

export const dropdownItem = {
  padding: "6px 8px",
  fontSize: "10px",
  cursor: "pointer",
  transition: "all 0.15s ease",
};

export const dropdownItemHover = {
  backgroundColor: "#FFDADA",
  color: "#D90000",
};
