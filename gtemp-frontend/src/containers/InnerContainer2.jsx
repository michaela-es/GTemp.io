// InnerContainer2.jsx
import React, { useState, useEffect, useCallback } from "react";
import { ItemWithStats } from "../DataComponents/Dashboards/Projects/DashboardProjectStats";
import RightPanel from "../DataComponents/Dashboards/Edit Project/RightPanel";
import LeftPanel from "../DataComponents/Dashboards/Edit Project/LeftPanel";
import FileUploadService from "../services/FileUploadService"; // same service used in UploadTemplateForm
import { styles } from "../DataComponents/Dashboards/styles"; // optional: for root styling

const InnerContainer2 = ({ activeInnerTab: propActiveInnerTab }) => {
  const [activeInnerTab, setActiveInnerTab] = useState(propActiveInnerTab || 1);

  useEffect(() => {
    if (propActiveInnerTab) setActiveInnerTab(propActiveInnerTab);
  }, [propActiveInnerTab]);

  // --- Form state (lifted) ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("250.00");
  const [selectedPricing, setSelectedPricing] = useState("Paid");
  const [selectedVisibility, setSelectedVisibility] = useState("Visible to Public");
  const [files, setFiles] = useState([]); // additional files
  const [coverImage, setCoverImage] = useState(null); // File object
  const [screenshots, setScreenshots] = useState([]); // File objects or URLs
  const [engine, setEngine] = useState("");
  const [type, setType] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const maxFiles = 5;
  const maxImages = 5;

  // === Handlers for LeftPanel ===
  const handleTitleChange = (value) => setTitle(value);
  const handleDescriptionChange = (value) => setDescription(value);

  const handlePricingSelect = (option) => {
    setSelectedPricing(option);
    if (option === "No Payment") setPrice("0.00");
    else if (option === "Paid") setPrice("250.00");
    else setPrice("0.00");
  };

  const handlePriceChange = (value) => {
    if (/^\d*\.?\d{0,2}$/.test(value)) setPrice(value);
  };
  const handlePriceBlur = () => {
    if (selectedPricing === "No Payment") {
      setPrice("0.00");
      return;
    }
    let num = parseFloat(price);
    if (isNaN(num) || num < 250) num = 250;
    setPrice(num.toFixed(2));
  };

  const handleVisibilitySelect = (option) => setSelectedVisibility(option);

  // Files (additional files)
  const addFiles = (newFiles) => {
    const combined = [...files, ...newFiles].slice(0, maxFiles);
    setFiles(combined);
  };
  const removeFile = (index) => setFiles((prev) => prev.filter((_, i) => i !== index));

  // Engine & Type (from EngineTypeDropUp)
  const handleEngineTypeSelect = (selectedEngine, selectedType) => {
    setEngine(selectedEngine);
    setType(selectedType);
  };

  // === Handlers for RightPanel ===
  const handleCoverChange = (file) => {
    // file can be a File object from input or dropzone
    setCoverImage(file);
  };

  const addScreenshots = (newImgs) => {
    const combined = [...screenshots, ...newImgs].slice(0, maxImages);
    setScreenshots(combined);
  };
  const removeScreenshot = (index) =>
    setScreenshots((prev) => prev.filter((_, i) => i !== index));

  // === Submit logic (similar to UploadTemplateForm) ===
  const handleSubmit = async () => {
    if (isSubmitting) return;
    // Basic validation
    if (!title.trim()) return setMessage("Error: Title is required");
    if (!engine || !type) return setMessage("Error: Engine and Type are required");
    if (!coverImage) return setMessage("Error: Cover image is required");

    setIsSubmitting(true);
    setMessage("");

    try {
      const userId = JSON.parse(localStorage.getItem("currentUser") || "{}")?.userID;

      const templateData = {
        templateTitle: title.trim(),
        templateDesc: description.trim(),
        priceSetting: selectedPricing, // NEW
        price: selectedPricing === "No Payment" ? 0 : parseFloat(price) || 0,
        visibility: selectedVisibility === "Visible to Public",
        engine,
        type,
        views: 0,
        downloads: 0,
        templateOwner: userId,
        rating: 0,
        averageRating: 0,
        wishlistCount: 0,
        isWishlisted: false,
        revenue: 0,
      };

      const formDataToSend = new FormData();
      const templateBlob = new Blob([JSON.stringify(templateData)], {
        type: "application/json",
      });
      formDataToSend.append("template", templateBlob);

      // coverImage might be a File or an object URL from preview. If object URL, it's not upload-able;
      // Here we expect real File objects passed from RightPanel. If it's just a string preview, user must re-select a File.
      formDataToSend.append("coverImage", coverImage);

      screenshots.forEach((img) => formDataToSend.append("images", img));
      files.forEach((file) => formDataToSend.append("files", file));

      // Optionally log entries for debugging
      // for (let [key, value] of formDataToSend.entries()) console.log(key, value);

      const response = await FileUploadService.uploadTemplate(formDataToSend);

      setMessage("Template created successfully!");
      // Reset
      setTitle("");
      setDescription("");
      setPrice("250.00");
      setSelectedPricing("Paid");
      setSelectedVisibility("Visible to Public");
      setFiles([]);
      setCoverImage(null);
      setScreenshots([]);
      setEngine("");
      setType("");
    } catch (err) {
      console.error("Upload error:", err);
      const errorMessage =
        err?.response?.data?.details ||
        err?.response?.data?.error ||
        err?.message ||
        "Unknown error";
      setMessage(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setPrice("250.00");
    setSelectedPricing("Paid");
    setSelectedVisibility("Visible to Public");
    setFiles([]);
    setCoverImage(null);
    setScreenshots([]);
    setEngine("");
    setType("");
    setMessage("");
  };

  // UI: tabs and content
  const innerInnerTabs = ["Creation Statistics", "Create New Project"];

  const tabsStyle = { display: "flex", backgroundColor: "#ffcccc" };
  const tabStyle = (tabNumber) => ({
    flex: 1,
    padding: "2px 0",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    color: activeInnerTab === tabNumber ? "#d90000" : "#000000",
    fontWeight: activeInnerTab === tabNumber ? "bold" : "normal",
    border: "1px solid #ccc",
    borderBottom: activeInnerTab === tabNumber ? "2px solid #d90000" : "1px solid #ccc",
    margin: "0",
    borderRadius: "0",
    boxSizing: "border-box",
  });

  const innerContentStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid #D9D9D9",
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "10px 0px",
    boxSizing: "border-box",
    overflowX: "hidden",
  };

  return (
    <div
      className="inner-container"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        margin: "0 250px",
        minWidth: 0,
        overflowX: "hidden",
      }}
    >
      {/* Tabs */}
      <div style={tabsStyle}>
        {innerInnerTabs.map((label, index) => (
          <div
            key={index}
            style={tabStyle(index + 1)}
            onClick={() => setActiveInnerTab(index + 1)}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={innerContentStyle}>
        {activeInnerTab === 1 && (
          <ItemWithStats
            itemProps={{
              image: "https://i.ytimg.com/vi/rvZ1NWNkYcY/maxresdefault.jpg",
              title: "Sample Item",
              price: "Free",
              releaseDate: "01/01/2025",
              updateDate: "10/09/2025",
            }}
            onEdit={() => setActiveInnerTab(2)}
          />
        )}

        {activeInnerTab === 2 && (
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <LeftPanel
                title={title}
                onTitleChange={handleTitleChange}
                description={description}
                onDescriptionChange={handleDescriptionChange}
                price={price}
                onPriceChange={handlePriceChange}
                onPriceBlur={handlePriceBlur}
                selectedPricing={selectedPricing}
                onPricingSelect={handlePricingSelect}
                selectedVisibility={selectedVisibility}
                onVisibilitySelect={handleVisibilitySelect}
                files={files}
                addFiles={addFiles}
                removeFile={removeFile}
                engine={engine}
                type={type}
                onEngineTypeSelect={handleEngineTypeSelect}
                onSave={handleSubmit}
                onClear={handleClear}
                isSubmitting={isSubmitting}
                message={message}
              />
            </div>

            <div style={{ flex: 1 }}>
              <RightPanel
                coverImage={coverImage}
                onCoverChange={handleCoverChange}
                screenshots={screenshots}
                addScreenshots={addScreenshots}
                removeScreenshot={removeScreenshot}
                maxImages={maxImages}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InnerContainer2;