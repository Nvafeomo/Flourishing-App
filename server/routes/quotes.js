import express from "express";
const router = express.Router();

// Fetch today's quote from zenquotes.io and return it to the client
router.get("/today", async (req, res) => {
  try {
    // Use global fetch (Node 18+). If not available, the server will need node-fetch installed.
    const resp = await fetch("https://zenquotes.io/api/today");
    if (!resp.ok) return res.status(502).json({ error: "Failed to fetch quote" });
    const data = await resp.json();
    // Return the quote data as-is
    res.json(data);
  } catch (err) {
    console.error("Error fetching quote:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
