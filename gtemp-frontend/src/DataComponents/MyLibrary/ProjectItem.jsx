import React, { useState, useEffect } from "react";
import gameCover from "../../assets/logo.png";
import axios from "axios";

const ProjectItem = ({ image, title, templateId, timeAgo, initialRating = 0, comment = "My comment", userEmail }) => {
  const [userRating, setUserRating] = useState(initialRating);

  //Display how much user rated this template
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/templates/${templateId}/rating`, {
          params: { userEmail }
        });
        setUserRating(response.data.ratingValue); // set the star value from database
      } catch (error) {
        console.error("Failed to fetch rating:", error);
      }
    };
    fetchRating();
  }, [templateId, userEmail]);
  // Save rating to backend
  const saveRating = async (rating) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/templates/${templateId}/rate`, null, {
        params: { userEmail, ratingValue: rating },
      });
      console.log(response.data.message);
    } catch (error) {
      console.error("Failed to save rating:", error);
    }
  };

  const handleStarClick = (star) => {
    setUserRating(star);
    saveRating(star);
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#f5f5f5ff", borderRadius: "10px", padding: "15px", width: "100%", boxSizing: "border-box", marginBottom: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "130px" }}>
        <img src={image || gameCover} alt={title} style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover", marginBottom: "8px" }} />
        <div style={{ fontWeight: "bold" }}>{title}</div>
      </div>

      <div style={{ flex: 1, paddingLeft: "20px", display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: "0.7rem", marginBottom: "5px" }}>{timeAgo}</div>

        <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleStarClick(star)}
              style={{ color: star <= userRating ? "#cc0000" : "#ccc", fontSize: "1.0rem", cursor: "pointer", transition: "color 0.2s", userSelect: "none" }}
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
