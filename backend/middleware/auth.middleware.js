import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

export const protect = async (req, res, next) => {
  const token = req.cookies?.mpsp || req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("No token found");  // Debugging line
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) throw new Error("User not found");
    next();
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied, required roles: ${roles.join(", ")}`,
      });
    }
    next();
  };
};
