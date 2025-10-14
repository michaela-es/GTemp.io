import React from "react";
import { styles } from "../styles";

const ProfileInstance = ({ setMode }) => {
  return (
    <>
      <div style={styles.profileDisplayContainer}>
        {/* LEFT FORM */}
        <div style={styles.leftForm}>
          <div style={styles.label}>Display Name</div>
          <input type="text" style={styles.input} placeholder="Enter display name" />
          <div style={styles.smallText}>This is the name everyone else will see.</div>

          <div style={styles.label}>Username</div>
          <input type="text" style={styles.input} placeholder="Enter username" />

          <div style={styles.label}>Email Address</div>
          <div style={styles.emailRow}>
            <input type="email" style={styles.input} placeholder="Enter email address" />
            <div style={styles.verifyBox}>
              <div style={styles.verifyIcon}></div>
              <span>Not Verified</span>
            </div>
          </div>

          <button style={styles.button}>Save Changes</button>
        </div>

        {/* RIGHT PROFILE PANEL */}
        <div style={styles.rightProfile}>
          <div style={styles.profileImage}></div>
          <div style={styles.profileName}>Display Name</div>
          <div style={styles.profileUsername}>@Username</div>
        </div>
      </div>

      {/* STATS */}
      <div style={styles.statsContainer}>
        {[
          ["Account Created", "October 12, 2025"],
          ["Wishlisted Items", "0"],
          ["Reviewed Items", "0"],
          ["Published Content", "0"],
        ].map(([title, value], idx) => (
          <div key={idx} style={styles.statBox}>
            <div style={styles.statTitle}>{title}</div>
            <div style={styles.statValue}>{value}</div>
          </div>
        ))}
      </div>

      {/* BOTTOM BUTTONS */}
      <div style={styles.bottomButtonsContainer}>
        <button style={styles.secondaryButton} onClick={() => setMode("security")}>
          Security
        </button>
        <button style={styles.deleteButton} onClick={() => setMode("delete")}>
          Delete Account
        </button>
      </div>
    </>
  );
};

export default ProfileInstance;
