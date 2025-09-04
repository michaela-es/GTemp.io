import React from "react";
import TopBar from "./components/TopBar.jsx";
import FilterBar from "./components/FilterBar.jsx";

function App() {
  const tags = ["Action", "Adventure", "RPG", "Strategy"];
  const types = ["Single Player", "Multiplayer", "Co-op"];

  const handleTagSelect = (tag) => {
    console.log("Selected Tag:", tag);
  };

  const handleTypeSelect = (type) => {
    console.log("Selected Type:", type);
  };

  return (
    <div>
      <TopBar />
      <FilterBar
        tags={tags}
        types={types}
        onTagSelect={handleTagSelect}
        onTypeSelect={handleTypeSelect}
      />
    </div>
  );
}

export default App;
