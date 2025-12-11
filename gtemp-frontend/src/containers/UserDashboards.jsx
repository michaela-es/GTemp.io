import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FirstContainer from "../components/display/Header";
import InnerContainer1 from "./InnerContainer1";
import InnerContainer2 from "./InnerContainer2";
import InnerContainer3 from "./InnerContainer3";
import { useAuth } from "../context/AuthContext";
import RegisterModal from "../components/authentication/RegisterModal";
import LoginModal from "../components/authentication/LoginModal";
const UserDashboards = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const { container = 1, subContainer = 1 } = location.state || {};
  const [activeTab, setActiveTab] = useState(container);
  const [activeInnerTab, setActiveInnerTab] = useState(subContainer);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    setActiveTab(container);
    setActiveInnerTab(subContainer);
  }, [container, subContainer]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleOpenLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    // User is now logged in via AuthContext
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
      margin: "0 250px",
      borderRadius: 0,
    },
    tab: (tabNumber) => ({
      flex: 1,
      padding: "10px",
      textAlign: "center",
      cursor: "pointer",
      backgroundColor: activeTab === tabNumber ? "#ff6666" : "#ffffff",
      fontWeight: activeTab === tabNumber ? "bold" : "normal",
      border: "1px solid #d9d9d9",
      borderBottom: activeTab === tabNumber ? "2px solid #ff6666" : "1px solid #d9d9d9",
      borderRadius: "8px 8px 0 0",
    }),
    tabContent: {
      flex: 1,
      display: "flex",
      width: "100%",
      height: "100%",
      overflow: "auto",
    },
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <FirstContainer
        isLoggedIn={!!currentUser}
        username={currentUser?.username}
        onLoginClick={handleOpenLogin}
        onLogout={handleLogout}
        style={styles.box1}
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

      {/* LOGIN MODAL */}
      {isLoginModalOpen && (
        <LoginModal
          onClose={handleCloseLoginModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default UserDashboards;