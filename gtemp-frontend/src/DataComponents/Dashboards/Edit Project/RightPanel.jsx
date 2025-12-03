// RightPanel.jsx
import React from "react";
import { styles } from "../styles";

const RightPanel = ({ coverImage, onCoverChange, screenshots = [], addScreenshots, removeScreenshot, maxImages = 5 }) => {
  const handleCoverInput = (e) => {
    const file = e.target.files[0];
    if (file) onCoverChange(file);
  };

  const handleScreenshotInput = (e) => {
    const files = Array.from(e.target.files || []);
    // limit to maxImages
    addScreenshots(files.slice(0, Math.max(0, maxImages - screenshots.length)));
  };

  // preview source: if coverImage is a File, create an object URL for preview. If it's already a string URL show it.
  const coverPreviewSrc = coverImage
    ? typeof coverImage === "string"
      ? coverImage
      : URL.createObjectURL(coverImage)
    : "https://uppervalleyaviation.com/wp-content/uploads/2018/01/background-transparent.png";

  return (
    <div style={styles.rightPanelContainer}>
      {/* Cover */}
      <div style={styles.coverContainer}>
        <img src={coverPreviewSrc} alt="Cover" style={styles.coverImage} />
        <label style={styles.coverUploadLabel}>
          Upload Cover Image
          <input type="file" accept="image/*" style={styles.hiddenInput} onChange={handleCoverInput} />
        </label>
      </div>

      {/* Screenshots */}
      <div>
        <label style={styles.screenshotButton}>
          Add Screenshot
          <input
            type="file"
            accept="image/*"
            multiple
            style={styles.hiddenInput}
            onChange={handleScreenshotInput}
          />
        </label>
        <div style={styles.screenshotContainer}>
          {screenshots.map((scr, index) => {
            const src = typeof scr === "string" ? scr : URL.createObjectURL(scr);
            return (
              <img
                key={index}
                src={src}
                alt={`Screenshot ${index + 1}`}
                style={styles.screenshotImage}
                onClick={() => removeScreenshot(index)}
                title="Click to remove"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;