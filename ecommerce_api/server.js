import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import user from "./routes/user.js";
import auth from "./routes/auth.js";
import role from "./routes/role.js";
import permission from "./routes/permission.js";
import mongoDBconnected from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";

// Initialize
const app = express();
dotenv.config();
// Dot Env Environment
const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Static Folder
app.use(express.static("public"));

app.use("/api/v1/auth", auth);
app.use("/api/v1/user", user);
app.use("/api/v1/permission", permission);
app.use("/api/v1/rule", role);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  mongoDBconnected();
  console.log(`Server is running on Port : ${PORT}`.bgGreen.black);
});
