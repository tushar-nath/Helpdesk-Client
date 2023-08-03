import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Board from "./Board";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the token from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      Cookies.set("jwt_token", token, { expires: 1 });
      // Call the API to get user data
      axios
        .get("http://localhost:3000/api/v1/api/user", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  return (
    <div className="min-h-screen items-center justify-center bg-gray-100">
      <div className="container mx-auto">
        <Board />
      </div>
    </div>
  );
}

export default Dashboard;
