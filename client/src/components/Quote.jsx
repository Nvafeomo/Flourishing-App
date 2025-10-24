import { useEffect, useState } from "react";

export default function Quote() {
  const [quote, setQuote] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuote() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/quotes/today");
        if (!response.ok) throw new Error("Failed to fetch quote");
        const data = await response.json();
        setQuote(`${data[0].q} — ${data[0].a}`);
      } catch (err) {
        console.error("Quote fetch error:", err);
        setError("Unable to load quote. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchQuote();
  }, []);

  return (
    <div className="quote-box">
      <h3>Inspirational Quote of the Day</h3>
      {loading ? (
        <p>Loading quote...</p>
      ) : error ? (
        <p style={{ color: "#b00020" }}>{error}</p>
      ) : (
        <p>{quote}</p>
      )}
    </div>
  );
}
