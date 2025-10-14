import React from "react";

// StatBox component
export const StatBox = ({ label, value, bgColor }) => (
  <div
    style={{
      width: "80px",
      height: "80px",
      backgroundColor: bgColor,
      color: "white",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      fontSize: "1rem",
    }}
  >
    <div style={{ fontSize: "1.2rem" }}>{value}</div>
    <div>{label}</div>
  </div>
);

// ItemCard component with release/update + bottom row
export const ItemCard = ({ image, title, price, releaseDate, updateDate, onEdit }) => (
  <div
    style={{
      display: "flex",
      backgroundColor: "#fff",
      borderRadius: "8px",
      padding: "10px",
      width: "450px",
      gap: "10px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    }}
  >
    {/* Image */}
    <img
      src={image}
      alt={title}
      style={{ width: "80px", height: "80px", borderRadius: "8px", objectFit: "cover" }}
    />

    {/* Right Content */}
    <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
      {/* Top Row: Title/Price | Release | Update */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: "bold", fontSize: "1rem" }}>{title}</div>
          <div>Price: {price}</div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: "bold" }}>Release</div>
          <div>{releaseDate}</div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: "bold" }}>Update</div>
          <div>{updateDate}</div>
        </div>
      </div>

      {/* Bottom Row: Rating / Edit / Published */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span>⭐⭐⭐⭐⭐</span>
          <span>(0)</span>
        </div>

        <button
          onClick={onEdit}
          style={{
            padding: "3px 6px",
            borderRadius: "5px",
            border: "1px solid #888",
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
        >
          Edit
        </button>

        <div style={{ backgroundColor: "#eee", padding: "3px 6px", borderRadius: "5px" }}>Published</div>
      </div>
    </div>
  </div>
);

// Container combining ItemCard + 5 StatBoxes
export const ItemWithStats = ({ itemProps, onEdit }) => (
  <div style={{ display: "flex", gap: "10px" }}>
    <ItemCard {...itemProps} onEdit={onEdit} />

    <div style={{ display: "flex", gap: "10px" }}>
      <StatBox label="Views" value={0} bgColor="#ffc0cb" />
      <StatBox label="Downloads" value={0} bgColor="#ff69b4" />
      <StatBox label="Revenue" value="$0.00" bgColor="#dda0dd" />
      <StatBox label="Rating" value="0.000" bgColor="#800080" />
      <StatBox label="Wishlist" value={0} bgColor="#8a2be2" />
    </div>
  </div>
);
