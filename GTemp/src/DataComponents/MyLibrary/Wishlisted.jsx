// WishlistView.jsx
import React from "react";
import ProjectItem from "./ProjectItem";
import { topRowStyle, boxStyle } from "./styles";

const Wishlist = () => {
    return (
    <>
      <div style={topRowStyle}>
        <div></div>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={boxStyle("blue")}>
            <div style={{ fontSize: "1.5rem" }}>0</div>
            <div>Wishlisted</div>
          </div>
        </div>
      </div>

      <ProjectItem
        title="Awesome Game"
        timeAgo="2 hours ago"
        initialRating={3}
        comment="Loved the story mode!"
      />

      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <span>Your wishlisted items will show here</span>
      </div>
    </>
  );
};

export default Wishlist;
