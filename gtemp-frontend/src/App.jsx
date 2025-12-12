import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from "./components/display/Body";
import UserDashboardsPage from "./containers/UserDashboards";
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";
import TemplateDetail2 from './pages/TemplateDetail2';
import { CommentsProvider } from "./context/CommentsContext";
import { WishlistProvider } from "./context/WishlistContext";
import { TemplatesProvider } from "./context/TemplatesContext";
import HomePage from "./pages/HomePage";
function App() {
  return (
  <AuthProvider>
    <TemplatesProvider>
      <WishlistProvider>
        <CommentsProvider>
              <Router>
                  <SearchProvider>
                <Routes>
                  <Route path="/" element={<HomePage/>} />
                  <Route path="/template/:id" element={<TemplateDetail2 />} />
                  <Route path="/dashboard" element={<UserDashboardsPage />} />
                </Routes>
                  </SearchProvider>
          </Router>
        </CommentsProvider>
      </WishlistProvider>
      </TemplatesProvider>
    </AuthProvider>


  );
}


export default App;
