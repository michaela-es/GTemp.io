// UserDashboards.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FirstContainer from "../components/display/Header";
import InnerContainer1 from "./InnerContainer1";
import InnerContainer2 from "./InnerContainer2";
import InnerContainer3 from "./InnerContainer3";

const UserDashboards = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { container = 1, subContainer = 1 } = location.state || {};
  const [activeTab, setActiveTab] = useState(container);
  const [activeInnerTab, setActiveInnerTab] = useState(subContainer);

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState("John Doe");

  useEffect(() => {
    setActiveTab(container);
    setActiveInnerTab(subContainer);
  }, [container, subContainer]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  // ===== STYLES AS JS OBJECTS =====
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100vw",
      height: "100vh",
    },
    box: {
      flex: 1,
    },
    tabs: {
      display: "flex",
      margin: "0 250px", // top/bottom 0, left/right 20px
      borderRadius: 0,  // no rounding
    },

    tab: (tabNumber) => ({
      flex: 1,
      padding: "10px",
      textAlign: "center",
      cursor: "pointer",
      backgroundColor: activeTab === tabNumber ? "#ff6666" : "#ffffff",
      fontWeight: activeTab === tabNumber ? "bold" : "normal",
      border: "1px solid #d9d9d9",                  // outline for all tabs
      borderBottom: activeTab === tabNumber ? "2px solid #ff6666" : "1px solid #d9d9d9", // highlight active tab
      borderRadius: "8px 8px 0 0",     // optional: slightly rounded top corners
    }),

    tabContent: {
      flex: 1,
      display: "flex",
      width: "100%",
      height: "100%",
      overflow: "auto",
    },
    box1: {
      backgroundColor: "red",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 20px",
      flex: "0 0 auto",
      height: "auto",
    },
    leftSection: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    logo: {
      width: "40px",
      height: "40px",
    },
    siteName: {
      fontSize: "1.5rem",
      color: "white",
      fontWeight: "bold",
    },
    middleSection: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
    },
    searchBox: {
      position: "relative",
      width: "50%",
      maxWidth: "400px",
    },
    searchInput: {
      width: "100%",
      padding: "10px 45px 10px 15px",
      border: "none",
      borderRadius: "25px",
      fontSize: "1rem",
    },
    searchButton: {
      position: "absolute",
      right: "8px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    loginButton: {
      backgroundColor: "white",
      color: "red",
      border: "none",
      borderRadius: "20px",
      padding: "10px 20px",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
    },
    box2: {
      backgroundColor: "green",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      padding: "15px 20px",
      flex: "0 0 auto",
      height: "auto",
    },
    filterWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "15px",
    },
    topFilters: {
      display: "flex",
      alignItems: "center",
      gap: "40px",
    },
    dropdownPair: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    topLabel: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "white",
    },
    topDropdown: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "white",
      color: "black",
      fontWeight: "bold",
      border: "none",
      borderRadius: "6px",
      padding: "6px 10px",
      minWidth: "120px",
      cursor: "pointer",
    },
    topDropdownIcon: {
      width: "18px",
      height: "18px",
      marginLeft: "8px",
    },
    filterBar: {
      display: "flex",
      alignItems: "center",
      gap: "40px",
    },
    filterItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      position: "relative",
    },
    filterText: {
      fontSize: "1.2rem",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "transform 0.2s, color 0.2s",
    },
    filterTextHover: {
      transform: "scale(1.1)",
      color: "yellow",
    },
    filterIcon: {
      width: "24px",
      height: "24px",
    },
    dropdownContent: {
      display: "none",
      flexDirection: "column",
      position: "absolute",
      top: "40px",
      left: 0,
      backgroundColor: "white",
      color: "black",
      padding: "10px",
      borderRadius: "10px",
      minWidth: "200px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
      zIndex: 10,
    },
    priceInput: {
      width: "80px",
      padding: "5px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      textAlign: "center",
    },
    applyButton: {
      width: "100%",
      padding: "8px",
      backgroundColor: "green",
      color: "white",
      fontWeight: "bold",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <FirstContainer
        isLoggedIn={isLoggedIn}
        username={username}
        onLoginClick={() => alert("Login clicked")}
        onLogout={handleLogout}
        style={styles.box1} // example: pass header style
      />

      {/* TABS */}
      <div style={styles.tabs}>
        {[
          { id: 1, label: "My Library" },
          { id: 2, label: "My Dashboards" },
          { id: 3, label: "Profile Settings" },
        ].map((tab) => (
          <div
            key={tab.id}
            style={styles.tab(tab.id)}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>


      {/* TAB CONTENT */}
      <div style={styles.tabContent}>
        {activeTab === 1 && <InnerContainer1 activeInnerTab={activeInnerTab} />}
        {activeTab === 2 && <InnerContainer2 activeInnerTab={activeInnerTab} />}
        {activeTab === 3 && <InnerContainer3 activeInnerTab={activeInnerTab} />}
      </div>
    </div>
  );
};

export default UserDashboards;
