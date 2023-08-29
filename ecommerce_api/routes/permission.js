import express from "express";
import {
  createPermission,
  deletePermission,
  getAllPermission,
  getSinglePermission,
  updatePermission,
  updatePermissionStatus,
} from "../controller/permission.js";

const router = express.Router();

// Routes
router.get("/", getAllPermission);
router.get("/:id", getSinglePermission);
router.post("/create", createPermission);
router.delete("/:id", deletePermission);
router.put("/:id", updatePermission);
router.patch("/:id", updatePermission);
router.put("/status/:id", updatePermissionStatus);

export default router;
