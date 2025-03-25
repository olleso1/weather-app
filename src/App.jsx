import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Weather from "./components/Weather"; //  vädersida
import ApiPage from "./components/ApiPage"; // API sida

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/apipage" element={<ApiPage />} /> {/* Ny sida */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
