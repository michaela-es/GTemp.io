import React from "react";
import { styles } from "../styles";

export const StatBox = ({ label, value, bgColor }) => (
  <div style={{ ...styles.statBox, backgroundColor: bgColor }}>
    <div style={styles.statValue}>{value}</div>
    <div>{label}</div>
  </div>
);

export const ItemCard = ({ image, title, price, releaseDate, updateDate, onEdit }) => (
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
          <span>⭐⭐⭐⭐⭐</span>
          <span>(0)</span>
        </div>
        <button onClick={onEdit} style={styles.editButton}>Edit</button>
        <div style={styles.publishedTag}>Published</div>
      </div>
    </div>
  </div>
);

export const ItemWithStats = ({ itemProps, onEdit }) => (
  <div style={styles.itemWithStatsContainer}>
    <ItemCard {...itemProps} onEdit={onEdit} />
    <div style={styles.statsGroup}>
      <StatBox label="Views" value={0} bgColor="#fff" />
      <StatBox label="Downloads" value={0} bgColor="#fff" />
      <StatBox label="Revenue" value="$0.00" bgColor="#fff" />
      <StatBox label="Rating" value="0.000" bgColor="#fff" />
      <StatBox label="Wishlist" value={0} bgColor="#fff" />
    </div>
  </div>
);
