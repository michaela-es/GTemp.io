import React from "react";
import Star from "./star";

const RatingBox = ({ templateRating }) => {
  const totalStars = 5;

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[...Array(totalStars)].map((_, i) => (
        <Star key={i} filled={i + 1 <= templateRating} />
      ))}
    </div>
  );
};

export default RatingBox;
