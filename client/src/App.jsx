import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import AuthForm from "./components/AuthForm";
import ReflectionList from "./components/ReflectionList";
import Quote from "./components/Quote";
import Mindfulness from "./pages/MindfulnessPage";

const API_BASE = "http://localhost:5001";

// Check if server is available
const checkServerHealth = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
    
    const response = await fetch(`${API_BASE}/`, {
      method: 'GET',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log("Server health check timed out");
    } else {
      console.log("Server health check failed:", error.message);
    }
    return false;
  }
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverAvailable, setServerAvailable] = useState(true);
  const [currentPage, setCurrentPage] = useState("login"); // login, mindfulness, quotes

  useEffect(() => {
    // Check server health on mount
    const checkServerOnMount = async () => {
      const isAvailable = await checkServerHealth();
      setServerAvailable(isAvailable);
      
      if (!isAvailable) {
        console.log("Server is not available, logging out user");
        // If server is down, log out the user
        if (auth.currentUser) {
          await signOut(auth);
        }
        setUser(null);
        setCurrentPage("login");
      }
    };

    checkServerOnMount();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Before setting user, check if server is available
      const isAvailable = await checkServerHealth();
      setServerAvailable(isAvailable);
      
      if (!isAvailable) {
        // Server is down, log out and don't set user
        console.log("Server unavailable, preventing login");
        if (firebaseUser) {
          await signOut(auth);
        }
        setUser(null);
        setCurrentPage("login");
        setLoading(false);
        return;
      }

      setUser(firebaseUser);
      setLoading(false);
      if (firebaseUser) {
        setCurrentPage("mindfulness");
      }
    });

    // Periodic server health check (every 5 seconds)
    const healthCheckInterval = setInterval(async () => {
      const isAvailable = await checkServerHealth();
      setServerAvailable(isAvailable);
      
      // Check if user is still logged in via Firebase
      const currentUser = auth.currentUser;
      if (!isAvailable && currentUser) {
        // Server went down, log out the user
        console.log("Server went offline, logging out user");
        await signOut(auth);
        // Don't set state here, let the auth state listener handle it
      }
    }, 5000);

    return () => {
      unsubscribe();
      clearInterval(healthCheckInterval);
    };
  }, []); // Remove user from dependencies to avoid infinite loop

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("login");
  };

  if (loading) {
    return (
      <div className="app" style={{ textAlign: "center", padding: "20px" }}>
        <h1>Human Flourishing App</h1>
        <p>Loading...</p>
      </div>
    );
  }

  // Show server unavailable message if server is down
  if (!serverAvailable && !user) {
    return (
      <div className="app" style={{ textAlign: "center", padding: "20px" }}>
        <h1>Human Flourishing App</h1>
        <div style={{ 
          padding: "20px", 
          background: "#fff3cd", 
          border: "1px solid #ffc107", 
          borderRadius: "8px",
          margin: "20px auto",
          maxWidth: "500px"
        }}>
          <h3 style={{ color: "#856404" }}>Server Unavailable</h3>
          <p style={{ color: "#856404" }}>
            The server is not running. Please start the server to continue.
          </p>
          <p style={{ color: "#856404", fontSize: "14px", marginTop: "10px" }}>
            Run: <code>cd server && npm start</code>
          </p>
        </div>
        <AuthForm
          user={user}
          setUser={(u) => {
            setUser(u);
            setCurrentPage("mindfulness"); // go to mindfulness page after login
          }}
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app" style={{ textAlign: "center", padding: "20px" }}>
        <h1>Human Flourishing App</h1>
        <AuthForm
          user={user}
          setUser={(u) => {
            setUser(u);
            setCurrentPage("mindfulness"); // go to mindfulness page after login
          }}
        />
      </div>
    );
  }

  // If server goes down while user is logged in, show message and logout
  if (!serverAvailable && user) {
    return (
      <div className="app" style={{ textAlign: "center", padding: "20px" }}>
        <h1>Human Flourishing App</h1>
        <div style={{ 
          padding: "20px", 
          background: "#f8d7da", 
          border: "1px solid #dc3545", 
          borderRadius: "8px",
          margin: "20px auto",
          maxWidth: "500px"
        }}>
          <h3 style={{ color: "#721c24" }}>Server Connection Lost</h3>
          <p style={{ color: "#721c24" }}>
            The server is no longer available. You have been logged out.
          </p>
          <p style={{ color: "#721c24", fontSize: "14px", marginTop: "10px" }}>
            Please start the server and log in again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app" style={{ textAlign: "center", padding: "20px" }}>
      {currentPage === "mindfulness" && (
        <Mindfulness
          goToQuotes={() => setCurrentPage("quotes")}
          handleLogout={handleLogout}
        />
      )}

      {currentPage === "quotes" && (
        <div>
          <h1>Daily Inspiration & Reflections</h1>
          <Quote user={user} />
          <ReflectionList user={user} />
          <div style={{ marginTop: "20px" }}>
            <button onClick={() => setCurrentPage("mindfulness")}>Back to Mindfulness</button>
            <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}
