import React from "react";
import Button from "./Button.jsx"; // Adjust the path if needed
import "./TopBar.css";

function TopBar() {
  return (
    <div className="top-bar">
      <div className="left">GTemp.io</div>
      <div className="center">
        <input
          type="search"
          className="search-bar"
          placeholder="Search for games, jams, tags, or creators..."
        />
      </div>
      <div className="right">
        <Button>Log In</Button>
      </div>
    </div>
  );
}

export default TopBar;
