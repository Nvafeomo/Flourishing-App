import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import reflectionRoutes from "./routes/Reflection.js"; // your reflection routes
import quotesRoutes from "./routes/quotes.js";
import admin from "firebase-admin"; // for Firebase Auth
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require("./firebaseServiceAccountKey.json");

dotenv.config({ path: './.env' });

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware to verify Firebase ID token
export const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // expects 'Bearer <token>'
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};

// Use reflection routes
app.use("/api/reflections", reflectionRoutes);
// Proxy quotes requests to avoid CORS issues with external API from the browser
app.use("/api/quotes", quotesRoutes);

// Connect to MongoDB Atlas
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/flourishing-app";
mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Optional test route
app.get("/", (req, res) => res.send("Server is running!"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
