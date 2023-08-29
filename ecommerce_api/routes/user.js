import express from "express";
import multer from "multer";
import path from "path";
import {
  createUser,
  deleteUser,
  getAllUser,
  updateUserStatus,
} from "../controller/user.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();
const __dirname = path.resolve();

/**
 * Multer featured sliders image
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "slides") {
      cb(null, path.join(__dirname, "/api/public/featured_slides"));
    } else if (file.fieldname === "profile") {
      cb(null, path.join(__dirname, "/api/public/profile_photo"));
    } else if (file.fieldname === "cover") {
      cb(null, path.join(__dirname, "/api/public/cover_photo"));
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadFeatured = multer({ storage: storage }).array("slides", 20);
const profilePhoto = multer({ storage: storage }).single("profile");
const coverPhoto = multer({ storage: storage }).single("cover");

router.get("/", getAllUser);
router.post("/create", createUser);
router.put("/status/:id", updateUserStatus);
router.delete("/:id", deleteUser);

export default router;
