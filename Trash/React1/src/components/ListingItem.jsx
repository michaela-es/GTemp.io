import React from "react";
import "./ListingItem.css";

function ListingItem({ image, title, description, rating, downloads }) {
  return (
    <div className="listing-item">
      <img src={image} alt={title} className="listing-image" />
      <h3 className="listing-title">{title}</h3>
      <p className="listing-description">{description}</p>
      <div className="listing-stats">
        <div className="stat">
          <strong>Rating:</strong> {rating} ⭐
        </div>
        <div className="stat">
          <strong>Downloads:</strong> {downloads}
        </div>
      </div>
    </div>
  );
}


export default ListingItem;
