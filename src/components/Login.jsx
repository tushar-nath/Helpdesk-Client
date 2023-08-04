import React from "react";

function Login() {
  const handleLogin = () => {
    // Redirect to the Google OAuth URL
    window.location.href = "http://localhost:3000/api/v1/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-md text-center">
        <h1 className="text-3xl font-bold mb-6">Login Page</h1>
        <button
          onClick={handleLogin}
          className="bg-black border hover:bg-white hover:text-black hover:border-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;