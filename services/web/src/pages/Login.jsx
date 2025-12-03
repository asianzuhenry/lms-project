import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// api route from .env file
const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/auth/login`, {
        email: email,
        password: password,
      }, { withCredentials: true });
      // localStorage.setItem("token", res.data.token);
      // redirect to dashboard
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
      // invalid credentials
      // add notification system later
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col bg-gray-200">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded shadow-md w-96 flex flex-col"
      >
        <label className="mb-2 font-semibold" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
          required
          autoComplete="username"
        />
        <label className="mb-2 font-semibold" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 p-2 border border-gray-300 rounded"
          required
          autoComplete="current-password"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded cursor-pointer hover:bg-blue-700"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
        <p>
          Forgot your password?{" "}
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Reset here
          </a>
        </p>
      </form>
    </div>
  );
}
