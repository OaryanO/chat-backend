import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

/* ---------------- ALLOWED ORIGINS ---------------- */
const allowedOrigins = [
  "https://chat-frontend-gilt-seven.vercel.app",
  "https://chat-frontend-git-main-aryan-singhs-projects-b9dd610f.vercel.app",
  "https://chat-frontend-4ihys6hsi-aryan-singhs-projects-b9dd610f.vercel.app",
  "http://localhost:3000"
];

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

/* ---------------- ROUTES ---------------- */
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

/* ---------------- SERVER ---------------- */
server.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});
