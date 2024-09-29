import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState("John Doe");
  const navigate = useNavigate();
  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    navigate("/products");
  };

  return (
    <div className="bg-neutral-800 py-2 opacity-1">
      <div className="mx-auto max-w-6xl px-8 flex justify-center sm:justify-end">
        <div className="flex gap-x-4 justify-center items-center">
          {isLoggedIn ? (
            <>
              {/* Display Username and Logout button when logged in */}
              <span className="text-white text-sm">{username}</span>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 hover:bg-red-600 py-1 px-3 text-sm rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Sign In and Create Account buttons for unauthenticated users */}
              <Link
                to="/login"
                className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 text-sm rounded"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-white bg-green-500 hover:bg-green-600 py-1 px-3 text-sm rounded"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
