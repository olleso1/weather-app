import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Weather from "./components/Weather"; // Din vädersida
import ApiPage from "./components/ApiPage"; // Den nya sidan

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
