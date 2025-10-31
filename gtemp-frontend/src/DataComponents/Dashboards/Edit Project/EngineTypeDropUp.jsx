import React, { useState } from "react";
import { styles } from "../styles";

const EngineTypeDropUp = () => {
  const [engineOpen, setEngineOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [hoveredEngine, setHoveredEngine] = useState(null);
  const [hoveredType, setHoveredType] = useState(null);

  const engines = ["Roblox Studio", "Unity 3D", "Unreal Engine", "Godot"];
  const types = [
    "Action",
    "Adventure",
    "RPG",
    "RTS/Diplomacy",
    "Street Fight & Platformer",
    "Board Games",
    "Systems",
  ];

  return (
    <div style={styles.dropUpContainer}>
      {/* Engine */}
      <div style={styles.dropUpWrapper}>
        <button
          onClick={() => setEngineOpen(!engineOpen)}
          style={styles.dropUpButton}
        >
          {selectedEngine || "Engine"} ▼
        </button>
        {engineOpen && (
          <div style={styles.dropUpMenu}>
            {engines.map((item, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredEngine(index)}
                onMouseLeave={() => setHoveredEngine(null)}
                onClick={() => {
                  setSelectedEngine(item);
                  setEngineOpen(false);
                }}
                style={{
                  ...styles.dropUpItem,
                  backgroundColor:
                    hoveredEngine === index ? "#FFDADA" : "#FFFFFF",
                  color: hoveredEngine === index ? "#D90000" : "#000000",
                  borderBottom:
                    index !== engines.length - 1 ? "1px solid #eee" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Type */}
      <div style={styles.dropUpWrapper}>
        <button
          onClick={() => setTypeOpen(!typeOpen)}
          style={styles.dropUpButton}
        >
          {selectedType || "Type"} ▼
        </button>
        {typeOpen && (
          <div style={styles.dropUpMenu}>
            {types.map((item, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredType(index)}
                onMouseLeave={() => setHoveredType(null)}
                onClick={() => {
                  setSelectedType(item);
                  setTypeOpen(false);
                }}
                style={{
                  ...styles.dropUpItem,
                  backgroundColor:
                    hoveredType === index ? "#FFDADA" : "#FFFFFF",
                  color: hoveredType === index ? "#D90000" : "#000000",
                  borderBottom:
                    index !== types.length - 1 ? "1px solid #eee" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EngineTypeDropUp;
