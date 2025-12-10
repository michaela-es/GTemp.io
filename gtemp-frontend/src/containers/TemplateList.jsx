import React from 'react';
import { ItemWithStats } from "../DataComponents/Dashboards/Projects/DashboardProjectStats";
import { useTemplateForm } from './TemplateFormContext';

const TemplateList = ({ templates }) => {
  const { populateEditForm } = useTemplateForm();

  const handleEdit = async (template) => {
    onEdit(template);
    setTimeout(() => {
      populateEditForm(template);
    }, 100);
  };
  
  if (templates.length === 0) {
    return <p>No templates created yet.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {templates.map((template) => (
        <ItemWithStats
          key={template.id}
          itemProps={{
            image: template.coverImagePath
            ? `http://localhost:8080/${template.coverImagePath}`
            : "/images/default-image.jpg",
            title: template.templateTitle,
            price: template.priceSetting === "No Payment" ? "Free" : `$${template.price}`,
            releaseDate: new Date(template.releaseDate).toLocaleDateString(),
            updateDate: template.updateDate ? new Date(template.updateDate).toLocaleDateString() : "-",
            rating: template.averageRating || 0,
            visibility: template.visibility ? "Published" : "Owner Only",
          }}
          stats={{
            downloads: template.downloadCount || 0,
            revenue: template.revenue || 0,
            rating: template.averageRating || 0,
            wishlist: template.wishlistCount || 0,
          }}
          onEdit={() => populateEditForm(template)}
        />
      ))}
    </div>
  );
};

export default TemplateList;