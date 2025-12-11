import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import filterIcon from "../../assets/filter-icon.svg";
import ProjectItem from "./ProjectItem";
import { topRowStyle, filterStyle, boxStyle, dropdownContainer, dropdownButton, dropdownMenu, dropdownItem, dropdownItemHover } from "./styles";

import api from "../../services/api"; 

const DownloadedPurchased = () => {
  const { currentUser } = useAuth();
  const [items, setItems] = useState([]);
  const [sort, setSort] = useState("Any Paid Amount");
  const [isOpen, setIsOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const sortOptions = [
    "Any Paid Amount",
    "Most to Least Paid Amount",
    "Least to Most Paid Amount",
  ];

  const handleSelect = (value) => {
    setSort(value);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!currentUser) {
      setItems([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchLibrary = async () => {
  try {
    const res = await api.get(`/templates/user/library`);
    console.log('Fetched library:', res); 
    if (res.status !== 200) throw new Error("Failed to fetch library");
    
    const data = res.data;
    console.log('Fetched data:', data); 

    let sorted = [...data];
    if (sort === "Most to Least Paid Amount") {
      sorted.sort((a, b) => (b.template.price || 0) - (a.template.price || 0));
    } else if (sort === "Least to Most Paid Amount") {
      sorted.sort((a, b) => (a.template.price || 0) - (b.template.price || 0));
    }
    setItems(sorted);
  } catch (err) {
    console.error("Error fetching library:", err);
  }
};


    fetchLibrary();
  }, [currentUser, sort]);

  const downloadedCount = items.filter(
    (i) => i.actionType === "FREE_DOWNLOAD" || i.actionType === "DONATED"
  ).length;
  const purchasedCount = items.filter(
    (i) => i.actionType === "PURCHASED"
  ).length;

  if (!currentUser) {
    return <p className="text-center mt-4">Please log in to view your downloaded/purchased templates.</p>;
  }

  return (
    <>
      <div style={topRowStyle}>
        <div style={filterStyle}>
          <img src={filterIcon} alt="Filter" style={{ width: 30, height: 30 }} />
          <span>Filters</span>

          <div style={dropdownContainer} onMouseLeave={() => setIsOpen(false)}>
            <div style={dropdownButton} onClick={() => setIsOpen((prev) => !prev)}>
              {sort} ▼
            </div>

            {isOpen && (
              <div style={dropdownMenu}>
                {sortOptions.map((option, i) => (
                  <div
                    key={option}
                    style={{
                      ...dropdownItem,
                      ...(hoverIndex === i ? dropdownItemHover : {}),
                    }}
                    onMouseEnter={() => setHoverIndex(i)}
                    onMouseLeave={() => setHoverIndex(null)}
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <div style={boxStyle("white")}>
            <div style={{ fontSize: "1.5rem" }}>{downloadedCount}</div>
            <div>Downloaded</div>
          </div>
          <div style={boxStyle("white")}>
            <div style={{ fontSize: "1.5rem" }}>{purchasedCount}</div>
            <div>Purchased</div>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <p>No purchases or downloads yet.</p>
      ) : (
        items.map((item) => (
          <ProjectItem
            key={item.id}
            title={item.template?.templateTitle || "Unknown"}
            templateId={item.template?.id || 0}
            userID={currentUser.userID}  
            timeAgo={item.actionDate ? new Date(item.actionDate).toLocaleString() : ""}
            comment={item.actionType}
            initialRating={item.ratingValue || 0}
          />
        ))
      )}
    </>
  );
};

export default DownloadedPurchased;
