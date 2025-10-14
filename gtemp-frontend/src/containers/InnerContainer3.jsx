import React, { useState } from "react";
import { styles } from "../DataComponents/Credentials/styles";
import ProfileSection from "../DataComponents/Credentials/Profile Settings/ProfileInstance";
import SecuritySection from "../DataComponents/Credentials/Profile Settings/SecurityInstance";
import DeleteSection from "../DataComponents/Credentials/Profile Settings/DeleteAccountInstance";
import CreditAccountItem from "../DataComponents/Credentials/Bank Accounts/CreditAccountItem";

const InnerContainer3 = () => {
  const [activeInnerTab, setActiveInnerTab] = useState(1);
  const [mode, setMode] = useState("profile");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const innerInnerTabs = ["Inner-inner 1", "Inner-inner 2"];

  return (
    <div className="inner-container" style={styles.container}>
      {/* Tabs */}
      <div style={styles.tabs}>
        {innerInnerTabs.map((label, index) => (
          <div
            key={index}
            style={styles.tab(index + 1, activeInnerTab)}
            onClick={() => {
              setActiveInnerTab(index + 1);
              setMode("profile");
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={styles.innerContent}>
        {activeInnerTab === 1 ? (
          <>
            {mode === "profile" && <ProfileSection setMode={setMode} />}
            {mode === "security" && <SecuritySection setMode={setMode} />}
            {mode === "delete" && <DeleteSection setMode={setMode} />}
          </>
        ) : (
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
