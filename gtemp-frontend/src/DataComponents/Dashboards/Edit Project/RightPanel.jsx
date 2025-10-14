import React, { useState } from "react";

const RightPanel = () => {
  const [coverImage, setCoverImage] = useState(
    "https://via.placeholder.com/300x200?text=Cover+Image"
  );
  const [screenshots, setScreenshots] = useState([]);

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  const handleAddScreenshot = (e) => {
    const files = Array.from(e.target.files);
    const newScreenshots = files.map((file) => URL.createObjectURL(file));
    setScreenshots((prev) => [...prev, ...newScreenshots]);
  };

  const removeScreenshot = (index) => {
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Cover Image */}
      <div
        style={{
            position: "relative",
            width: "400px", // set a fixed width for the cover image
            height: "200px",
            border: "2px dashed #ccc",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            margin: "0 auto", // centers the container
        }}
        >
        <img
            src={coverImage}
            alt="Cover"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <label
            style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "8px 12px",
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
            }}
        >
            Upload Cover Image
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleCoverUpload} />
        </label>
        </div>


      {/* Screenshots */}
      <div>
        <label
          style={{
            padding: "10px 15px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
            display: "inline-block",
          }}
        >
          Add Screenshot
          <input type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handleAddScreenshot} />
        </label>

        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            minHeight: "100px",
            border: "2px dashed #ccc",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          {screenshots.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Screenshot ${index + 1}`}
              style={{ width: "100px", height: "100px", objectFit: "cover", cursor: "pointer", borderRadius: "5px" }}
              onClick={() => removeScreenshot(index)}
              title="Click to remove"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
