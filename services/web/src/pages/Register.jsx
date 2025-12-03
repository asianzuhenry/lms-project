import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// api route from .env file
const API = import.meta.env.VITE_API_URL;

function Register() {
  const [role, setRole] = useState("student");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    // Registration logic to be implemented
    // username, email, password, role
    // const role = role;

    try {
      const res = await axios.post(`${API}/api/auth/register`, {
        username: username,
        email: email,
        password: password,
        role: role,
      });
      navigate("/profile");
    } catch (err) {
      alert(err.response.data.message); // email already in use
      // add notification system later
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col bg-gray-200">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <div>
          <form
            className="bg-white p-8 rounded shadow-md w-96 flex flex-col"
            onSubmit={submit}
          >
            <label className="mb-2 font-semibold" htmlFor="username">
              Username:
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              className="mb-4 p-2 border border-gray-300 rounded"
              required
            />
            <label className="mb-2 font-semibold" htmlFor="email">
              Email:
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="mb-4 p-2 border border-gray-300 rounded"
              required
            />
            <label htmlFor="role">Register As:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
            <label className="mb-2 font-semibold" htmlFor="password">
              Password:
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="mb-6 p-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded cursor-pointer hover:bg-blue-700"
            >
              Register
            </button>
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login here
              </a>
            </p>
          </form>
      </div>
    </div>
  );
}

export default Register;
