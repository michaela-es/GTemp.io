import React from "react";
import HeadingText from "./HeadingText";

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
    style={{ marginTop: '.5em' }}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const RatingBox = ({ templateRating }) => {
  const totalStars = 5;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ gap: "8px" }}>
      <div style={{ display: "flex", gap: "4px", justifyContent: "center", width: "100%" }}>
        {[...Array(totalStars)].map((_, i) => (
          <Star key={i} filled={i < templateRating} />
        ))}
      </div>
    </div>
  );
};

export default RatingBox;