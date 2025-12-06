// DownloadedPurchased.jsx
import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../../context/AuthContext"; // import your AuthContext hook
import filterIcon from "../../assets/filter-icon.svg";
import ProjectItem from "./ProjectItem";
import {
  topRowStyle,
  filterStyle,
  boxStyle,
  dropdownContainer,
  dropdownButton,
  dropdownMenu,
  dropdownItem,
  dropdownItemHover,
} from "./styles";

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
    if (!currentUser) return;

    const fetchLibrary = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/templates/user/${currentUser.userID}/library`
        );
        if (!res.ok) throw new Error("Failed to fetch library");
        const data = await res.json();

        // Optional: sort by Paid Amount
        let sorted = [...data];
        if (sort === "Most to Least Paid Amount") {
          sorted.sort((a, b) => (b.template.price || 0) - (a.template.price || 0));
        } else if (sort === "Least to Most Paid Amount") {
          sorted.sort((a, b) => (a.template.price || 0) - (b.template.price || 0));
        }
        setItems(sorted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLibrary();
  }, [currentUser, sort]);

  // Count downloaded vs purchased
  const downloadedCount = items.filter(
    (i) => i.actionType === "FREE_DOWNLOAD" || i.actionType === "DONATED"
  ).length;
  const purchasedCount = items.filter(
    (i) => i.actionType === "PURCHASED"
  ).length;

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
            title={item.template.templateTitle}
            templateId={item.template.id}
            userID={currentUser.userID}   // updated prop
            timeAgo={new Date(item.actionDate).toLocaleString()}
            comment={item.actionType}
            initialRating={item.ratingValue || 0}
          />

        ))
      )}
    </>
  );
};

export default DownloadedPurchased;
