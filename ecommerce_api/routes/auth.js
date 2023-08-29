import express from "express";
import {
  logedInUser,
  login,
  logout,
  register,
  updateUser,
} from "../controller/auth.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", verifyToken, logedInUser);
router.put("/update/:id", verifyToken, updateUser);

export default router;
