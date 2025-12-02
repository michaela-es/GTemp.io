import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from "./components/display/Body";
import UserDashboardsPage from "./containers/UserDashboards";
import { AuthProvider } from "./context/AuthContext";

import TemplateDetail from './pages/TemplateDetail';
import WishlistPage from './pages/WishlistPage';
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
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/template/:id" element={<TemplateDetail />} />
              <Route path="/dashboard" element={<UserDashboardsPage />} />
            </Routes>
          </Router>
        </CommentsProvider>
      </WishlistProvider>
      </TemplatesProvider>
    </AuthProvider>


  );
}


export default App;

// import React, { useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import MainPage from './pages/HomePage';
// import TemplateDetail from './pages/TemplateDetail';
// import './App.css';

// const App = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [query, setQuery] = useState('');
//   const [filters, setFilters] = useState({
//     engine_type: [],
//     template_type: [],
//     price_range: []
//   });
//   const [activeSorts, setActiveSorts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const dataResponse = await fetch('/data.json');
//         const templatesData = await dataResponse.json();
//         setData(templatesData);
//       } catch (error) {
//         console.error('Error loading data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [query, filters, activeSorts]);

//   if (loading) return <div>Loading templates...</div>;

//   return (
//     <Routes>
//       <Route path="/" element={
//         <MainPage
//           data={data}
//           query={query}
//           setQuery={setQuery}
//           filters={filters}
//           setFilters={setFilters}
//           activeSorts={activeSorts}
//           setActiveSorts={setActiveSorts}
//           currentPage={currentPage}
//           setCurrentPage={setCurrentPage}
//           itemsPerPage={itemsPerPage}
//         />
//       } />
//       <Route path="/template/:templateID" element={<TemplateDetail />} />
//     </Routes>
//   );
// };

// export default App;