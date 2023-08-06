import React from "react";
import Google from "../images/google.png";

const base_url = process.env.REACT_APP_API_BASE_URL;

function Login() {
  const handleLogin = () => {
    // Redirect to the Google OAuth URL
    window.location.href = `${base_url}/api/v1/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-md text-center">
        <h1 className="text-3xl font-bold mb-6">Login Page</h1>
        <div className="flex justify-center">
          {" "}
          <button
            onClick={handleLogin}
            className="flex items-center bg-black border hover:bg-white hover:text-black hover:border-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <img src={Google} alt="Google Logo" className="h-6 w-6 mr-2" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
