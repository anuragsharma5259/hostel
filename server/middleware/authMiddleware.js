import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // console.log(req.headers)
    // console.log(process.env.JWT_SECRET)
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);
      req.user = await User.findById(decoded.id).select("-password");
      // console.
      // console.log(req.user ,"in auth middleware")
      return next();
    } catch (error) {
      console.error("Invalid token");
      return res.status(401).end(); // 🔇 silently block
    }
  }

  return res.status(401).end(); // 🔇 no token provided
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    return res.status(401).end(); // 🔇 silently block
  }
};

export { protect, admin };