import React from "react";
import { styles } from "../styles";

const RightPanel = ({ 
  coverImage,         
  coverImageUrl,     
  onCoverChange, 
  screenshotUrls = [], 
  newScreenshotFiles = [], 
  addScreenshots, 
  removeScreenshotUrl,
  removeScreenshotFile,
  maxImages = 5 
}) => {
  const handleCoverInput = (e) => {
    const file = e.target.files[0];
    if (file) onCoverChange(file);
  };

  const allScreenshots = [
    ...screenshotUrls.map(url => ({ type: 'url', data: url })),
    ...newScreenshotFiles.map(file => ({ type: 'file', data: file }))
  ].slice(0, maxImages);

  const handleScreenshotInput = (e) => {
    const files = Array.from(e.target.files || []);
    const availableSlots = maxImages - allScreenshots.length;
    addScreenshots(files.slice(0, Math.max(0, availableSlots)));
  };

  const getCoverPreviewSrc = () => {
    if (coverImage instanceof File) {
      return URL.createObjectURL(coverImage);
    }
    
    if (coverImageUrl) {
      if (coverImageUrl.startsWith('http')) {
        return coverImageUrl;
      } else {
        return `http://localhost:8080/${coverImageUrl.replace(/^\/+/, '')}`;
      }
    }
    
    return "https://uppervalleyaviation.com/wp-content/uploads/2018/01/background-transparent.png";
  };

  const getCoverLabel = () => {
    if (coverImage instanceof File) return "New Cover Image (will replace current)";
    if (coverImageUrl) return "Current Cover Image - Upload new to replace";
    return "Upload Cover Image";
  };

  return (
    <div style={styles.rightPanelContainer}>
      <div style={styles.coverContainer}>
        <img 
          src={getCoverPreviewSrc()} 
          alt="Cover" 
          style={{
            ...styles.coverImage,
            border: coverImage instanceof File ? '2px solid #4CAF50' : 
                    coverImageUrl ? '2px solid #ccc' : 'none'
          }} 
        />
        <div style={{ 
          marginTop: '8px', 
          fontSize: '12px', 
          color: coverImage instanceof File ? '#4CAF50' : '#666' 
        }}>
          {getCoverLabel()}
        </div>
        <label style={styles.coverUploadLabel}>
          Upload Cover Image
          <input 
            type="file" 
            accept="image/*" 
            style={styles.hiddenInput} 
            onChange={handleCoverInput} 
          />
        </label>
      </div>

      <div>
        <label style={styles.screenshotButton}>
          Add Screenshot ({allScreenshots.length}/{maxImages})
          <input
            type="file"
            accept="image/*"
            multiple
            style={styles.hiddenInput}
            onChange={handleScreenshotInput}
            disabled={allScreenshots.length >= maxImages}
          />
        </label>
        
        <div style={styles.screenshotContainer}>
          {allScreenshots.map((item, index) => {
            const src = item.type === 'url' 
              ? (item.data.startsWith('http') 
                  ? item.data 
                  : `http://localhost:8080/${item.data.replace(/^\/+/, '')}`)
              : URL.createObjectURL(item.data);
            
            const isUrl = item.type === 'url';
            const originalIndex = isUrl 
              ? screenshotUrls.findIndex(url => url === item.data)
              : newScreenshotFiles.findIndex(file => file === item.data);
            
            return (
              <div key={index} style={{ position: 'relative' }}>
                <img
                  src={src}
                  alt={`Screenshot ${index + 1}`}
                  style={{
                    ...styles.screenshotImage,
                    border: isUrl ? '2px solid #ccc' : '2px solid #4CAF50'
                  }}
                  title={isUrl ? "Existing screenshot" : "New screenshot (will replace)"}
                />
                
                <button
                  onClick={() => {
                    console.log("Remove clicked! Item data:", item.data, "Type:", isUrl ? "URL" : "File");
                    if (isUrl) {
                      removeScreenshotUrl(item.data);
                    } else {
                      removeScreenshotFile(originalIndex);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    lineHeight: '20px',
                    textAlign: 'center',
                    padding: 0
                  }}
                  title="Remove"
                >
                  ×
                </button>
                
                {isUrl && (
                  <div style={{
                    position: 'absolute',
                    bottom: '5px',
                    left: '5px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    fontSize: '10px',
                    padding: '2px 4px',
                    borderRadius: '3px'
                  }}>
                    Existing
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;