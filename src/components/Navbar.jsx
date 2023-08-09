import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "./contexts/UserContext";
import Cookies from "js-cookie";
import LogoutIcon from "../images/logout.svg";
import Logo from "../images/logo.svg";

function Navbar() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-[#141414] p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Insert the Logo component here */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-6 h-6 mr-2" />
          <Link to="/dashboard" className="text-white font-bold text-xl">
            Helpdesk
          </Link>
        </div>
        {/* Render the user's name on the extreme right if user exists */}
        {user && (
          <div className="flex items-center">
            <p className="text-white mr-4">{user.name}</p>
            <button
              className="text-white border-none rounded"
              onClick={handleLogout}
            >
              <img
                src={LogoutIcon}
                alt="Logout"
                className="w-5 h-5 fill-current text-white border-none"
              />
            </button>
          </div>
        )}
        {/* Add more navigation links here */}
      </div>
    </nav>
  );
}

export default Navbar;
