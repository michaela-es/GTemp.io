const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;

  if (!formData.templateTitle.trim()) return setMessage("Error: Title is required");
  if (!formData.engine || !formData.type)
    return setMessage("Error: Engine and Type are required");
  if (!coverImage) return setMessage("Error: Cover image is required");

  console.log("currentUser.userID:", currentUser.userID, "Type:", typeof currentUser.userID);

  setIsSubmitting(true);
  setMessage("");

  try {
    const templateData = {
      templateTitle: formData.templateTitle.trim(),
      templateDesc: formData.templateDesc.trim(),
      price: selectedPricing === "No Payment" ? 0 : parseFloat(price) || 0,
      visibility: selectedVisibility === "Visible to Public",
      engine: formData.engine,
      type: formData.type,
      views: 0,
      downloads: 0,
      templateOwner: Number(currentUser.userID), 
      templateOwnerUsername: currentUser.username,
      rating: 0,
      averageRating: 0,
      wishlistCount: 0,
      isWishlisted: false,
      revenue: 0,
      priceSetting: selectedPricing,
      releaseDate: new Date().toISOString(),
      updateDate: new Date().toISOString()
    };

    console.log("Template data to send:", templateData);

    const formDataToSend = new FormData();
    
    const templateBlob = new Blob([JSON.stringify(templateData)], {
      type: 'application/json'
    });
    formDataToSend.append("template", templateBlob);
    
    formDataToSend.append("coverImage", coverImage);
    templateImages.forEach((img) => formDataToSend.append("images", img));
    files.forEach((file) => formDataToSend.append("files", file));

    console.log("FormData entries:");
    for (let [key, value] of formDataToSend.entries()) {
      if (value instanceof Blob && !(value instanceof File)) {
        const text = await value.text();
        console.log(`${key}:`, JSON.parse(text));
      } else if (value instanceof File) {
        console.log(`${key}: ${value.name} (${value.size} bytes)`);
      } else {
        console.log(`${key}:`, value);
      }
    }

    const response = await FileUploadService.uploadTemplate(formDataToSend);
    
    console.log("Success:", response.data);
    setMessage("Template created successfully!");
    
    setFormData({ templateTitle: "", templateDesc: "", engine: "", type: "" });
    setCoverImage(null);
    setTemplateImages([]);
    setFiles([]);
    setPrice("250.00");
    setSelectedPricing("Paid");
    setSelectedVisibility("Visible to Public");
  } catch (err) {
    console.error("Upload error:", err);
    const errorMessage =
      err.response?.data?.details ||
      err.response?.data?.error ||
      err.message ||
      "Unknown error";
    setMessage(`Error: ${errorMessage}`);
  } finally {
    setIsSubmitting(false);
  }
};