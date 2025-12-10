import React from "react";
import "./NoAccess.css"; 


// sourced from: https://codepen.io/claireremmert/pen/MqzOxJ
const NoAccess = () => {
  return (
    <div className="no-access-wrapper">
      <div className="no-access-container">
        <div className="no-access-hole no-access-hole-1"></div>
        <div className="no-access-hole no-access-hole-2"></div>
        <div className="no-access-hole no-access-hole-3"></div>
        <div className="no-access-hole no-access-hole-4"></div>
        <header className="no-access-header">
          <h1 className="no-access-title">403 forbidden</h1>
        </header>
        <section className="no-access-body">
          <div className="no-access-copy">
            <h2 className="no-access-subtitle">Authorized Personnel Only</h2>
            <p className="no-access-message">
              <strong>Error 403: Forbidden</strong>. You do not have permission to view this page.
            </p>
          </div>
          <div className="no-access-circle">
            <svg version="1.1" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
              <defs>
                <pattern id="no-access-image" patternUnits="userSpaceOnUse" height="450" width="450">
                  <image x="25" y="25" height="450" width="450" xlinkHref="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"></image>
                </pattern>
              </defs>
              <circle
                cx="250"
                cy="250"
                r="200"
                strokeWidth="40px"
                stroke="#ef5350"
                fill="url(#no-access-image)"
              />
              <line x1="100" y1="100" x2="400" y2="400" strokeWidth="40px" stroke="#ef5350" />
            </svg>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NoAccess;