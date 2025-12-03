import jwt from "jsonwebtoken";

export const generateToken = (res, userId, role) => {
  const token = jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,   // can't be accessed by JS
    secure: false,    // true in production (HTTPS)
    sameSite: "lax",  // allows cookies across localhost
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
