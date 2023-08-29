import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  // const authHeader = req.headers.authorization || req.headers.Authorization;
  const auth_token = req.cookies.auth_token;

  if (!auth_token) {
    return res.status(400).json({ message: "Unauthorized" });
  }

  jwt.verify(
    auth_token,
    process.env.JWT_SECRET,
    asyncHandler(async (err, decode) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Token" });
      }

      const me = await User.findOne({ email: decode.email })
        .select("-password")
        .populate("role");
      req.me = me;
      next();
    })
  );
});

export default verifyToken;
