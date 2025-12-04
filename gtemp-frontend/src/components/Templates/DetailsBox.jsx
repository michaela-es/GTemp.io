import React from "react";

export function DetailsBox({ releaseDate, engine, templateOwnerUsername, type }) {
  const styles = {
    container: {
      backgroundColor: "#000000ff", 
      padding: "16px",
      borderRadius: "8px",
      width: "max-content",
      fontFamily: "Arial, sans-serif",
      fontSize: "14px",
    },
    row: {
      display: "flex",
      margin: "8px 0",
      justifyContent: "flex-start",
      color: "#fff",
    },
    label: {
      fontWeight: "bold",
      minWidth: "120px",
      marginRight: "10px",
      color: "#fff", 
    },
    value: {
      fontWeight: "normal",
      color: "#fff",
    },
  };

  return (
    <div style={styles.container}>
      <p style={styles.row}>
        <span style={styles.label}>Release Date</span>
        <span style={styles.value}>{releaseDate}</span>
      </p>
      <p style={styles.row}>
        <span style={styles.label}>Engine</span>
        <span style={styles.value}>{engine}</span>
      </p>
      <p style={styles.row}>
        <span style={styles.label}>Owner</span>
        <span style={styles.value}>{templateOwnerUsername || "Unknown"}</span>
      </p>
      <p style={styles.row}>
        <span style={styles.label}>Type</span>
        <span style={styles.value}>{type}</span>
      </p>
    </div>
  );
}
