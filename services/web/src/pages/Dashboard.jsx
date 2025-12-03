import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

// api route from .env file
const API = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [courses, setCourses] = useState(null);
  const [checking, setChecking] = useState(true); // loading auth status
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API}/api/dashboard/courses`, {
          withCredentials: true, // ⬅️ important for cookies
        });

        setCourses(res.data);
        console.log(res.data);

        setChecking(false);
      } catch (err) {
        console.error(err);
        setAuthError(true);
        setChecking(false);
      }
    };

    fetchCourses();
  }, []);

  if (authError) {
    return <Navigate to="/login" replace />;
  }
  // still loading
  if (checking) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <div className="p-4 border-b bg-blue-600 mb-4 flex flex-col items-center justify-center">
        <h1 className="font-bold mb-4 text-4xl text-white">Dashboard</h1>
        <p className="text-white ">Welcome to your dashboard!</p>
      </div>
      {/* Add more dashboard content here */}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Your Courses</h2>
      <div className="p-4 bg-amber-300 rounded-2xl w-fit h-24 my-12"> {/* number of courses */}
        <h2 className="text-2xl font-bold mb-4">There are {courses ? courses.length : 0} Courses Available</h2>
      </div>
        {courses && courses.length > 0 ? (
          <ul className="space-y-2">
            {courses.map((course) => (
              <li
                key={course.id}
                className="p-4 border rounded shadow hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-xl">{course.title}</h3>
                <p className="text-gray-600">{course.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You are not enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
}
