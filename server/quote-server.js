import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/quotes/today', async (req, res) => {
  try {
    const response = await fetch('https://zenquotes.io/api/today');
    if (!response.ok) {
      throw new Error('Failed to fetch quote from external API');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Quote fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));