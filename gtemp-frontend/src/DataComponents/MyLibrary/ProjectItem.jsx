// RatingItem.jsx
import React, { useState } from "react";
import gameCover from "../../assets/logo.png"; // adjust path if needed

const ProjectItem = ({ image, title, timeAgo, initialRating = 0, comment = "My comment" }) => {
  const [userRating, setUserRating] = useState(initialRating);

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#f5f5f5ff",
        borderRadius: "10px",
        padding: "15px",
        width: "100%",
        boxSizing: "border-box",
        marginBottom: "20px",
      }}
    >
      {/* Left: Image + Title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "130px",
        }}
      >
        <img
          src={image || gameCover}
          alt={title}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "8px",
            objectFit: "cover",
            marginBottom: "8px",
          }}
        />
        <div style={{ fontWeight: "bold" }}>{title}</div>
      </div>

      {/* Right: Time + Stars + Comment */}
      <div
        style={{
          flex: 1,
          paddingLeft: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: "0.7rem", marginBottom: "5px" }}>{timeAgo}</div>

        {/* ⭐ Rating Stars */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setUserRating(star)}
              style={{
                color: star <= userRating ? "#cc0000" : "#ccc",
                fontSize: "1.0rem",
                cursor: "pointer",
                transition: "color 0.2s",
                userSelect: "none",
              }}
            >
              ★
            </span>
          ))}
          <div style={{ marginLeft: "8px" }}>({userRating})</div>
        </div>

        <div style={{ fontSize: "1rem" }}>{comment}</div>
      </div>
    </div>
  );
};

export default ProjectItem;
