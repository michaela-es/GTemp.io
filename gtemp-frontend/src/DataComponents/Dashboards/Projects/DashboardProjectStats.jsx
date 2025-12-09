import React from "react";
import { styles } from "../styles";

export const StatBox = ({ label, value, bgColor }) => (
  <div style={{ ...styles.statBox, backgroundColor: bgColor }}>
    <div style={styles.statValue}>{value}</div>
    <div>{label}</div>
  </div>
);

export const ItemCard = ({ image, title, price, releaseDate, updateDate, rating, onEdit, visibility }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div style={styles.itemCard}>
      <img src={image} alt={title} style={styles.itemImage} />
      <div style={styles.itemRight}>
        <div style={styles.itemTopRow}>
          <div>
            <div style={styles.itemTitle}>{title}</div>
            <div>Price: {price}</div>
          </div>
          <div style={styles.itemDateBlock}>
            <div style={styles.boldText}>Release</div>
            <div>{releaseDate}</div>
          </div>
          <div style={styles.itemDateBlock}>
            <div style={styles.boldText}>Update</div>
            <div>{updateDate}</div>
          </div>
        </div>

        <div style={styles.itemBottomRow}>
          <div style={styles.ratingGroup}>
            <span className="star-rating">
              {"★".repeat(fullStars)}
              {halfStar ? "⯨" : ""}
              {"☆".repeat(emptyStars)}
              <span className="rating-number"> ({rating.toFixed(1)})</span>
            </span>
          </div>
          <button onClick={onEdit} style={styles.editButton}>
            Edit
          </button>
          <div style={styles.publishedTag}>{visibility}</div> {/* <-- use visibility prop */}
        </div>
      </div>
    </div>
  );
};


export const ItemWithStats = ({ itemProps, stats, onEdit }) => (
  <div style={styles.itemWithStatsContainer}>
    <ItemCard {...itemProps} onEdit={onEdit} />
    <div style={styles.statsGroup}>
      <StatBox label="Downloads" value={stats?.downloads || 0} bgColor="#fff" />
      <StatBox label="Revenue" value={`$${stats?.revenue?.toFixed(2) || "0.00"}`} bgColor="#fff" />
      <StatBox label="Rating" value={stats?.rating?.toFixed(3) || "0.000"} bgColor="#fff" />
      <StatBox label="Wishlist" value={stats?.wishlist || 0} bgColor="#fff" />
    </div>
  </div>
);
