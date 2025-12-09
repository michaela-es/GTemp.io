import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
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

const RatedViewed = () => {
  const { currentUser } = useAuth();
  const [ratedItems, setRatedItems] = useState([]);
  const [ratingFilter, setRatingFilter] = useState("Any Rating");
  const [isOpen, setIsOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const ratingOptions = ["Any Rating", "5 Star", "4 Star", "3 Star", "2 Star", "1 Star"];

  const handleSelect = (value) => {
    setRatingFilter(value);
    setIsOpen(false);
  };

  // Clear items if user logs out
  useEffect(() => {
    if (!currentUser) {
      setRatedItems([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchRatedTemplates = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/templates/user/${currentUser.userID}/rated`
        );
        if (!res.ok) throw new Error("Failed to fetch rated templates");
        const data = await res.json();

        // Filter by rating if needed
        let filtered = data;
        if (ratingFilter !== "Any Rating") {
          const star = parseInt(ratingFilter[0]);
          filtered = data.filter((item) => item.ratingValue === star);
        }

        setRatedItems(filtered);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRatedTemplates();
  }, [currentUser, ratingFilter]);

  // Show message if not logged in
  if (!currentUser) return <p className="text-center mt-4">Please log in to view rated templates.</p>;

  return (
    <>
      <div style={topRowStyle}>
        <div style={filterStyle}>
          <img src={filterIcon} alt="Filter" style={{ width: 30, height: 30 }} />
          <span>Filters</span>

          <div style={dropdownContainer} onMouseLeave={() => setIsOpen(false)}>
            <div style={dropdownButton} onClick={() => setIsOpen((prev) => !prev)}>
              {ratingFilter} ▼
            </div>

            {isOpen && (
              <div style={dropdownMenu}>
                {ratingOptions.map((option, i) => (
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
            <div style={{ fontSize: "1.5rem" }}>{ratedItems.length}</div>
            <div>Rated</div>
          </div>
        </div>
      </div>

      {ratedItems.length === 0 ? (
        <p>No rated templates yet.</p>
      ) : (
        ratedItems.map((item) => (
          <ProjectItem
            key={item.id}
            title={item.template?.templateTitle || "Unknown"}
            templateId={item.template?.id || 0}
            userID={currentUser.userID}
            timeAgo={item.ratedAt ? new Date(item.ratedAt).toLocaleString() : ""}
            initialRating={item.ratingValue || 0}
          />
        ))
      )}
    </>
  );
};

export default RatedViewed;
