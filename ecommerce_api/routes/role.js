import express from "express";
import {
  createRule,
  deleteRule,
  getAllRule,
  getSingleRule,
  updateRule,
  updateRuleStatus,
} from "../controller/role.js";

const router = express.Router();

// Routes
router.get("/", getAllRule);
router.get("/:id", getSingleRule);
router.post("/create", createRule);
router.delete("/:id", deleteRule);
router.put("/:id", updateRule);
router.patch("/:id", updateRule);
router.put("/status/:id", updateRuleStatus);

export default router;
