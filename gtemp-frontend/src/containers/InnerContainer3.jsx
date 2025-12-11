


import React, { useState } from "react";
import { styles } from "../DataComponents/Credentials/styles";
import ProfileSection from "../DataComponents/Credentials/Profile Settings/ProfileInstance";
import SecuritySection from "../DataComponents/Credentials/Profile Settings/SecurityInstance";
import CreditAccountItem from "../DataComponents/Credentials/Bank Accounts/CreditAccountItem";
import { useAuth } from '../context/AuthContext';
import api from "../services/api";

const InnerContainer3 = () => {
  const [activeInnerTab, setActiveInnerTab] = useState(1);
  const [mode, setMode] = useState("profile");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const { currentUser, refreshWallet } = useAuth();

  const innerInnerTabs = ["Profile Settings", "Bank Accounts"];

  const tabsStyle = { display: "flex", width: "100%" };

  const addLoadToWallet = async (amount) => {
    if (!currentUser) return;
    
    try {
      const response = await api.post(
        `http://localhost:8080/api/users/wallet/add`,
        { amount }
      );
      console.log('Wallet updated:', response.data.wallet);
      
      // Update AuthContext
      refreshWallet(); // will fetch updated wallet and update state + localStorage
    } catch (err) {
      console.error('Failed to add load:', err);
      alert('Failed to add load');
    }
  };

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
    backgroundColor: "#ffffff",
    border: "1px solid #d9d9d9",
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "10px 20px",
    boxSizing: "border-box",
    overflowY: "auto",
    scrollbarWidth: "none",        // Firefox
    msOverflowStyle: "none",       // IE + Edge
  };

  return (
    <div
      className="inner-container"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        margin: "0 250px",
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      {/* Tabs */}
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

      {/* Content */}
      <div style={innerContentStyle}>
        {activeInnerTab === 1 && (
          <>
            {mode === "profile" && <ProfileSection setMode={setMode} />}
            {mode === "security" && <SecuritySection setMode={setMode} />}
            {mode === "delete" && <DeleteSection setMode={setMode} />}
          </>
        )}

        {activeInnerTab === 2 && (
          <div style={styles.creditContainer}>
            <h2 style={styles.creditHeader}>Credit Accounts</h2>

            <CreditAccountItem
              onDeleteClick={() => setShowDeleteModal(true)}
              styles={styles}
            />

            <button
              style={styles.addBankButton}
              onClick={() => setShowAddModal(true)}
            >
              Add new bank
            </button>

            <h2 style={styles.creditHeader}>Buy Load</h2>

            {/* Load Buttons Grid */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
    gap: "10px",
    marginTop: "10px",
  }}
>
{[50, 100, 150, 200, 300, 500, 750, 850, 1000].map((amount, index) => (
  <button
    key={index}
    style={{
      padding: "10px",
      backgroundColor: "#f0f0f0",
      border: "1px solid #ccc",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
    onClick={() => addLoadToWallet(amount)}
  >
    {amount} load
  </button>
))}
</div>


            {/* Add Modal */}
            {showAddModal && (
              <div style={styles.modalOverlay}>
                <div style={styles.addAccountModal}>
                  <div style={styles.addAccountHeader}>
                    <h3>Add New Credit Account</h3>
                    <button
                      onClick={() => setShowAddModal(false)}
                      style={styles.modalClose}
                    >
                      ✕
                    </button>
                  </div>

                  <div style={styles.addAccountImageButtons}>
                    <button style={styles.addAccountOption}>
                      <img
                        src="https://via.placeholder.com/80x40?text=Paypal"
                        alt="Paypal"
                      />
                    </button>
                    <button style={styles.addAccountOption}>
                      <img
                        src="https://via.placeholder.com/80x40?text=GCash"
                        alt="GCash"
                      />
                    </button>
                  </div>

                  <div style={styles.addAccountInputGroup}>
                    <label>Paypal Email</label>
                    <input
                      type="text"
                      placeholder="Enter your Paypal email"
                      style={styles.addAccountInput}
                    />
                  </div>

                  <div style={styles.addAccountInputGroup}>
                    <label>Name.me link</label>
                    <input
                      type="text"
                      placeholder="Enter your Name.me link"
                      style={styles.addAccountInput}
                    />
                  </div>

                  <div style={styles.addAccountBottomRow}>
                    <button style={styles.addAccountSubmit}>Add Account</button>
                    <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <input type="checkbox" />
                      <span>
                        I accept the <strong>Conditions and Consequences</strong>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
              <div style={styles.modalOverlay}>
                <div style={styles.deleteConfirmationModal}>
                  <div style={styles.deleteConfirmationHeader}>
                    <h3>Delete</h3>
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      style={styles.modalClose}
                    >
                      ✕
                    </button>
                  </div>
                  <p>Do you confirm to remove this account?</p>
                  <button style={styles.deleteConfirmationButton}>
                    Yes, remove it
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InnerContainer3;
