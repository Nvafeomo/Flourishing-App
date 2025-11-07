import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default function AuthForm({ user, setUser }) {
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Login with either username or email
  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      let emailToUse = "";

      // Determine if input is email or username
      if (usernameOrEmail.includes("@")) {
        emailToUse = usernameOrEmail;
      } else {
        // Lookup email by username
        const res = await fetch(`/api/users/email?username=${usernameOrEmail}`);
        if (!res.ok) throw new Error("Username not found");
        const data = await res.json();
        emailToUse = data.email;
      }

      const userCred = await signInWithEmailAndPassword(auth, emailToUse, password);
      setUser(userCred.user);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Signup and register username/email pair in MongoDB
  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // Save username + email to MongoDB
      await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email }),
      });

      setUser(userCred.user);
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="auth-box" style={{
      maxWidth: 400,
      margin: "auto",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      gap: 10,
    }}>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          {mode === "login" ? (
            <>
              <h3>Login</h3>
              <label>Username or Email:</label>
              <input
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="Enter username or email"
              />

              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />

              <button onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>

              <p style={{ marginTop: 10 }}>
                Don’t have an account?{" "}
                <button onClick={() => setMode("signup")} style={{ color: "blue", border: "none", background: "none", cursor: "pointer" }}>
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              <h3>Sign Up</h3>
              <label>Username:</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
              />

              <label>Email:</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />

              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />

              <button onClick={handleSignup} disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </button>

              <p style={{ marginTop: 10 }}>
                Already have an account?{" "}
                <button onClick={() => setMode("login")} style={{ color: "blue", border: "none", background: "none", cursor: "pointer" }}>
                  Login
                </button>
              </p>
            </>
          )}

          {error && <p style={{ color: "#b00020" }}>Error: {error}</p>}
        </>
      )}
    </div>
  );
}
