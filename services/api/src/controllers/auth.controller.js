import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already in use" });

  const user = await User.create({ username, email, password, role });

  const token = generateToken(res, user);

  res.json({ message: "Account created", token });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Create cookie
    let token = generateToken(res, user._id, user.role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // use HTTPS
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "lax",
    secure: false, // set true in production
  });

  return res.status(200).json({ message: "Logged out" });
};


export const checkAuthStatus = async (req, res) => {
  if (!req.cookies.token) {
    return res.status(200).json({ loggedIn: false });
  }

  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    return res.status(200).json({
      loggedIn: true,
      user: {
        id: user._id,
        role: user.role,
        username: user.username,
      }
    });
  } catch (err) {
    return res.status(200).json({ loggedIn: false });
  }
};
