import { useEffect, useState } from "react";
import "../styles/Quote.css";

const API_BASE = "http://localhost:5001/api";

export default function Quote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quoteHistory, setQuoteHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const fetchQuote = async (endpoint = "/today", isInitial = false) => {
    // Prevent multiple simultaneous fetches (but allow retries)
    if (loading && !isInitial && !error) {
      console.log("Already loading, skipping duplicate fetch");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Build full URL
      const url = `${API_BASE}/quotes${endpoint}`;
      console.log("🔄 Fetching quote from:", url, "isInitial:", isInitial);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      console.log("✅ Response status:", response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Quote API error:", response.status, errorText);
        throw new Error(`Failed to fetch quote: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("📦 Quote data received:", data);
      
      // Check if data is valid
      if (!data || !Array.isArray(data) || !data[0] || !data[0].q) {
        console.error("❌ Invalid quote data:", data);
        throw new Error("Invalid quote data received");
      }
      
      const newQuote = { text: data[0].q, author: data[0].a };
      console.log("✨ New quote parsed:", newQuote);
      
      setQuote(newQuote.text);
      setAuthor(newQuote.author);
      
      // Add to history if it's a new quote (not navigating back)
      if (isInitial) {
        // Initial load - today's quote
        setQuoteHistory([newQuote]);
        setCurrentIndex(0);
        console.log("🎯 Initial quote loaded, history length: 1, index: 0");
      } else if (endpoint === "/random") {
        // Fetch new random quote - update history and index together
        setQuoteHistory((prevHistory) => {
          const updated = [...prevHistory, newQuote];
          console.log("➕ Added new quote to history. Total quotes:", updated.length);
          return updated;
        });
        // Update index after history is set
        setCurrentIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          console.log("📍 Updated index to:", newIndex);
          return newIndex;
        });
      }
      
      // Clear any previous errors on success
      setError(null);
      console.log("✅ Quote fetch successful!");
    } catch (err) {
      if (err.name === 'AbortError') {
        console.error("⏱️ Request timeout");
        setError("Request timed out. Click 'Next' to try again.");
      } else {
        console.error("❌ Quote fetch error details:", {
          message: err.message,
          name: err.name,
          endpoint: endpoint,
          url: `${API_BASE}/quotes${endpoint}`
        });
        setError(`Unable to load quote: ${err.message}. Click "Next" to try again.`);
      }
      // Don't clear the current quote if we have one in history
      // Only set error, keep previous quote displayed
      if (isInitial && quoteHistory.length === 0) {
        // Only clear quote/author if this is the initial load and we have no history
        setQuote("");
        setAuthor("");
      }
    } finally {
      setLoading(false);
      console.log("🏁 Loading complete");
    }
  };

  useEffect(() => {
    fetchQuote("/today", true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNextQuote = async () => {
    console.log("Next button clicked. Current state:", {
      currentIndex,
      historyLength: quoteHistory.length,
      error,
      loading
    });
    
    // If loading, don't do anything
    if (loading) {
      console.log("Already loading, ignoring click");
      return;
    }
    
    // If there's an error, always try to fetch a new quote
    if (error) {
      console.log("Error detected, fetching new quote to retry...");
      await fetchQuote("/random", false);
      return;
    }
    
    // Check if we can navigate forward in history
    if (currentIndex >= 0 && currentIndex < quoteHistory.length - 1) {
      // Navigate forward in history
      console.log("Navigating forward in history from index", currentIndex, "to", currentIndex + 1);
      const nextQuote = quoteHistory[currentIndex + 1];
      if (nextQuote) {
        setQuote(nextQuote.text);
        setAuthor(nextQuote.author);
        setCurrentIndex(currentIndex + 1);
        setError(null);
        return;
      }
    }
    
    // Fetch a new random quote
    console.log("Fetching new random quote (at end of history or no history)");
    await fetchQuote("/random", false);
  };

  const handlePreviousQuote = () => {
    if (currentIndex > 0) {
      const prevQuote = quoteHistory[currentIndex - 1];
      setQuote(prevQuote.text);
      setAuthor(prevQuote.author);
      setCurrentIndex(currentIndex - 1);
      setError(null); // Clear any errors when navigating
    }
  };
  
  return (
    <div className="quote-box">
      <h3>Inspirational Quote</h3>
      {loading && !quote ? (
        <p>Loading quote...</p>
      ) : (
        <>
          <div className="quote-content">
            {error && (
              <p className="quote-error">{error}</p>
            )}
            {quote && (
              <>
                <p className="quote-text">"{quote}"</p>
                <p className="quote-author">— {author}</p>
              </>
            )}
            {!quote && !error && (
              <p>No quote available. Click "Next" to load one.</p>
            )}
          </div>
          <div className="quote-navigation">
            <button 
              className="nav-button prev-button"
              onClick={handlePreviousQuote}
              disabled={currentIndex <= 0 || loading}
            >
              ← Previous
            </button>
            <button 
              className="nav-button next-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Next button clicked - handler called");
                handleNextQuote();
              }}
              type="button"
              disabled={loading}
            >
              {loading ? "Loading..." : error ? "Retry →" : "Next →"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
