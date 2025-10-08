import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThreeVerticalContainers from "./components/ThreeVerticalContainers";
import UserDashboardsPage from "./containers/UserDashboards";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ThreeVerticalContainers />} />
        <Route path="/dashboard" element={<UserDashboardsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

