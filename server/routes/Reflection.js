import express from "express";
import Reflection from "../models/Reflection.js";
const router = express.Router();

// Get all reflections for a user
router.get("/:userId", async (req, res) => {
  try {
    const reflections = await Reflection.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(reflections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new reflection
router.post("/", async (req, res) => {
  try {
    // If reflectionDate is provided, use it; otherwise default to now
    const reflectionData = {
      ...req.body,
      reflectionDate: req.body.reflectionDate ? new Date(req.body.reflectionDate) : new Date(),
    };
    const newReflection = new Reflection(reflectionData);
    await newReflection.save();
    res.json(newReflection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
