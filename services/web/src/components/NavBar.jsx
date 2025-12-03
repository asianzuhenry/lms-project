import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = checking

// api route from .env file
const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${API}/api/auth/check`,
          { withCredentials: true } // ⬅️ send cookies
        );

        setIsLoggedIn(res.data.loggedIn);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoggedIn === null) {
    return (
      <div className="bg-white text-gray-800 p-4 h-16 flex items-center border-b border-gray-300">
        <h1 className="text-2xl font-bold text-blue-600">Learning Board</h1>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800 p-4 h-16 w-full flex items-center border-b border-gray-300">
      <h1 className="text-2xl font-bold text-blue-600">Learning Board</h1>

      <ul className="flex ml-8 space-x-4 w-1/2 justify-end">
        <li className="cursor-pointer text-blue-600 text-lg hover:bg-blue-600 hover:text-white rounded-lg">
          <Link className="p-2 block" to="/">Home</Link>
        </li>

        <li className="cursor-pointer text-blue-600 text-lg hover:bg-blue-600 hover:text-white rounded-lg">
          <Link className="p-2 block" to="/about">About</Link>
        </li>

        <li className="cursor-pointer text-blue-600 text-lg hover:bg-blue-600 hover:text-white rounded-lg">
          <Link className="p-2 block" to="/contact">Contact</Link>
        </li>

        {!isLoggedIn ? (
          <li className="cursor-pointer text-blue-600 text-lg hover:bg-blue-600 hover:text-white rounded-lg">
            <Link className="p-2 block" to="/login">Login</Link>
          </li>
        ) : (
          <>
            <li className="cursor-pointer text-blue-600 text-lg hover:bg-blue-600 hover:text-white rounded-lg">
              <Link className="p-2 block" to="/dashboard">Dashboard</Link>
            </li>

            <li className="cursor-pointer text-blue-600 text-lg hover:bg-blue-600 hover:text-white rounded-lg">
              <Link className="p-2 block" to="/profile">Profile</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default NavBar;
