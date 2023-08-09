import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#141414] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-white font-bold text-xl">
          Helpdesk
        </Link>
        {/* Add more navigation links here */}
      </div>
    </nav>
  );
}

export default Navbar;
