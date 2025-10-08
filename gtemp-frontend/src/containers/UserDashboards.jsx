// UserDashboards.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FirstContainer from "../components/FirstContainer";
import InnerContainer1 from "./InnerContainer1";
import InnerContainer2 from "./InnerContainer2";
import InnerContainer3 from "./InnerContainer3";
import "../static/ThreeVerticalContainers.css";

const UserDashboards = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get state from navigation (defaults to 1,1)
  const { container = 1, subContainer = 1 } = location.state || {};

  const [activeTab, setActiveTab] = useState(container);
  const [activeInnerTab, setActiveInnerTab] = useState(subContainer);

  // Simulated login state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState("John Doe");

  // Sync with navigation state if user comes from UserSection
  useEffect(() => {
    setActiveTab(container);
    setActiveInnerTab(subContainer);
  }, [container, subContainer]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/"); // redirect back to ThreeVerticalContainers
  };

  const tabsStyle = {
    display: "flex",
    backgroundColor: "#ffcccc",
    marginTop: "0",
  };

  const tabStyle = (tabNumber) => ({
    flex: 1,
    padding: "10px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: activeTab === tabNumber ? "#ff6666" : "#ffcccc",
    fontWeight: activeTab === tabNumber ? "bold" : "normal",
  });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <FirstContainer
        isLoggedIn={isLoggedIn}
        username={username}
        onLoginClick={() => alert("Login clicked")}
        onLogout={handleLogout}
      />

      {/* TABS */}
      <div style={tabsStyle}>
        {[1, 2, 3].map((tab) => (
          <div key={tab} style={tabStyle(tab)} onClick={() => setActiveTab(tab)}>
            Inner-container {tab}
          </div>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div
        style={{
          flex: 1,
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
      >
        {activeTab === 1 && (
          <InnerContainer1 activeInnerTab={activeInnerTab} />
        )}
        {activeTab === 2 && (
          <InnerContainer2 activeInnerTab={activeInnerTab} />
        )}
        {activeTab === 3 && (
          <InnerContainer3 activeInnerTab={activeInnerTab} />
        )}
      </div>
    </div>
  );
};

export default UserDashboards;
