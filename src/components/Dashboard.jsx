import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-md">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        {user ? (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
