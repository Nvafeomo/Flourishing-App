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
    const newReflection = new Reflection(req.body);
    await newReflection.save();
    res.json(newReflection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
