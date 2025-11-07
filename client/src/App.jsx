import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import AuthForm from "./components/AuthForm";
import ReflectionList from "./components/ReflectionList";
import Quote from "./components/Quote";
import Mindfulness from "./pages/MindfulnessPage";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("login"); // login, mindfulness, quotes

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      if (firebaseUser) {
        setCurrentPage("mindfulness");
      }
    });

    return () => unsubscribe();
  }, []);

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
