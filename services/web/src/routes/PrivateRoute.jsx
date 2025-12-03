import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PrivateRoute() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/auth/check`, {
        withCredentials: true, // very important
      })
      .then(() => {
        setIsLoggedIn(true);
        setLoading(false);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}
