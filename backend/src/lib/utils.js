import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 25 * 60 * 1000, //Milliseconds
    httpOnly: true, //prevent XSS Attack cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attack
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
