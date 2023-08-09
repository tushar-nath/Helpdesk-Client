import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import "tailwindcss/tailwind.css";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <div className="h-[5%] bg-gray-800 text-white">
          <Navbar />
        </div>
        <div className="h-[95%] overflow-hidden bg-gray-100">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
