import mongoose from "mongoose";

const ReflectionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  content: { type: String, required: true },
  reflectionDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Reflection", ReflectionSchema);
