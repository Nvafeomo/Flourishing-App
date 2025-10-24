import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getIdToken,
} from "firebase/auth";

export default function Auth({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      // Log full credential for debugging (safe in dev only)
      console.log("Login success userCred:", userCred);
      // Try to get ID token and log it for debugging
      try {
        const token = await userCred.user.getIdToken();
        console.log("ID token (first 32 chars):", token?.slice(0, 32));
      } catch (tErr) {
        console.warn("Failed to get ID token:", tErr);
      }
      setUser(userCred.user);
    } catch (err) {
      console.error("Login error:", err);
      // Provide more actionable messages for common Firebase errors
      if (err.code === "auth/configuration-not-found") {
        setError(
          "auth/configuration-not-found: The Firebase project configuration for this API key wasn't found.\n" +
            "Check that Email/Password sign-in is enabled in the Firebase console, your API key matches the project, and your API key isn't restricted to disallow localhost."
        );
      } else {
        setError(`${err.code || "error"}: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signup success userCred:", userCred);
      try {
        const token = await userCred.user.getIdToken();
        console.log("ID token (first 32 chars):", token?.slice(0, 32));
      } catch (tErr) {
        console.warn("Failed to get ID token:", tErr);
      }
      setUser(userCred.user);
    } catch (err) {
      console.error("Signup error:", err);
      if (err.code === "auth/configuration-not-found") {
        setError(
          "auth/configuration-not-found: The Firebase project configuration for this API key wasn't found.\n" +
            "Make sure Email/Password sign-in is enabled in the Firebase console, the API key matches this project, and any API key restrictions allow localhost."
        );
      } else {
        setError(`${err.code || "error"}: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="auth-box">
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ marginTop: 8 }}>
            <button onClick={handleLogin} disabled={loading}>
              {loading ? "..." : "Login"}
            </button>
            <button onClick={handleSignup} disabled={loading} style={{ marginLeft: 8 }}>
              {loading ? "..." : "Sign Up"}
            </button>
          </div>
          {error && (
            <div style={{ color: "#b00020", marginTop: 8 }}>
              <strong>Error:</strong> {error}
            </div>
          )}
        </>
      )}
    </div>
  );
}
