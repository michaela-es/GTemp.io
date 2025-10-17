import React, { useState } from "react";
import { styles } from "../styles";

const RightPanel = () => {
  const [coverImage, setCoverImage] = useState("https://uppervalleyaviation.com/wp-content/uploads/2018/01/background-transparent.png");

  const [screenshots, setScreenshots] = useState([]);

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) setCoverImage(URL.createObjectURL(file));
  };

  const handleAddScreenshot = (e) => {
    const files = Array.from(e.target.files);
    const newScreenshots = files.map((file) => URL.createObjectURL(file));
    setScreenshots((prev) => [...prev, ...newScreenshots]);
  };

  const removeScreenshot = (index) => setScreenshots((prev) => prev.filter((_, i) => i !== index));

  return (
    <div style={styles.rightPanelContainer}>
      {/* Cover */}
      <div style={styles.coverContainer}>
        <img src={coverImage} alt="Cover" style={styles.coverImage} />
        <label style={styles.coverUploadLabel}>
          Upload Cover Image
          <input type="file" accept="image/*" style={styles.hiddenInput} onChange={handleCoverUpload} />
        </label>
      </div>

      {/* Screenshots */}
      <div>
        <label style={styles.screenshotButton}>
          Add Screenshot
          <input type="file" accept="image/*" multiple style={styles.hiddenInput} onChange={handleAddScreenshot} />
        </label>
        <div style={styles.screenshotContainer}>
          {screenshots.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Screenshot ${index + 1}`}
              style={styles.screenshotImage}
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
