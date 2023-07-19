import React, { useEffect, useState } from "react";
import axios from "axios";

function ProtectedPage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/protected"
        );
        console.log(response.data);
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-md">
        <h1 className="text-3xl font-bold mb-6">Protected Page</h1>
        {userData ? (
          <div>
            <p>Welcome, {userData.name}!</p>
            <p>Email: {userData.email}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default ProtectedPage;
