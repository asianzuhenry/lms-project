import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

// api route from .env file
const API = import.meta.env.VITE_API_URL;

function Profile() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true); // loading auth status
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API}/api/user/profile`, {
          withCredentials: true, // ⬅️ important for cookies
        });

        setUser(res.data);
        setChecking(false);
      } catch (err) {
        console.error(err);
        setAuthError(true);
        setChecking(false);
      }
    };

    fetchProfile();
  }, []);

  const handlelogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      // Clear any optional UI-storage
      localStorage.removeItem("user");

      // Redirect to login
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  // still loading
  if (checking) {
    return <div>Loading profile...</div>;
  }

  // not authenticated
  if (authError) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <div className="p-4 bg-blue-700 text-white h-1/2 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        {/* TEACHER, STUDENT, ADMIN */}
        {user.role === "admin" && (
          <img
            src="admin-badge.png"
            alt="Admin Badge"
            className="w-16 h-16 mb-4 rounded-4xl"
          />
        )}
        {user.role === "instructor" && (
          <img
            src="instructor-badge.png"
            alt="Instructor Badge"
            className="w-16 h-16 mb-4 rounded-4xl"
          />
        )}
        {user.role === "student" && (
          <img
            src="student-badge.png"
            alt="Student Badge"
            className="w-16 h-16 mb-4 rounded-4xl"
          />
        )}
        <p className="mb-2">Username: {user.username}</p>
        <p className="mb-2">Email: {user.email}</p>
        <p className="mb-2">Role: {user.role}</p>
      </div>
      <div className="p-4 flex space-x-4">
        <button
          className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
          onClick={() => handlelogout()}
        >
          Logout
        </button>
        <button 
        className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >Edit Profile</button>
      </div>
    </>
  );
}

export default Profile;
