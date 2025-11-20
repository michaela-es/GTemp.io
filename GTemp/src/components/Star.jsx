import React from "react";

const Star = ({ filled }) => (
  <svg
    height="24"
    width="24"
    viewBox="0 0 24 24"
    fill={filled ? "#FFD700" : "none"}
    stroke="#FFD700"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ cursor: "pointer" }}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default Star;
