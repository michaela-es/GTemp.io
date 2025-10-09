//EngineTypeDrop-up.jsx
import React, { useState } from "react";

const EngineTypeSelector = () => {
  const [engineOpen, setEngineOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState("");
  const [selectedType, setSelectedType] = useState("");

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
    <div style={{ display: "flex", gap: "10px" }}>
      {/* Engine Drop-up */}
      <div style={{ flex: 1, position: "relative" }}>
        <button
          onClick={() => setEngineOpen(!engineOpen)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            cursor: "pointer",
            width: "100%",
            textAlign: "left",
            backgroundColor: "#fff",
          }}
        >
          {selectedEngine || "Engine"} ▼
        </button>
        {engineOpen && (
          <div
            style={{
              position: "absolute",
              bottom: "100%",
              left: 0,
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#fff",
              zIndex: 10,
            }}
          >
            {engines.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedEngine(item);
                  setEngineOpen(false);
                }}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: index !== engines.length - 1 ? "1px solid #eee" : "none",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Type Drop-up */}
      <div style={{ flex: 1, position: "relative" }}>
        <button
          onClick={() => setTypeOpen(!typeOpen)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            cursor: "pointer",
            width: "100%",
            textAlign: "left",
            backgroundColor: "#fff",
          }}
        >
          {selectedType || "Type"} ▼
        </button>
        {typeOpen && (
          <div
            style={{
              position: "absolute",
              bottom: "100%",
              left: 0,
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#fff",
              zIndex: 10,
            }}
          >
            {types.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedType(item);
                  setTypeOpen(false);
                }}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: index !== types.length - 1 ? "1px solid #eee" : "none",
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

export default EngineTypeSelector;
