import { useState } from "react";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";

export default function Auth({ user, setUser }) {
  const [identifier, setIdentifier] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 LOGIN with username or email
  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      let loginEmail = identifier;

      // If it's a username (no @), look up corresponding email in Firestore
      if (!identifier.includes("@")) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", identifier));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) throw new Error("No user found with that username.");
        loginEmail = querySnapshot.docs[0].data().email;
      }

      const userCred = await signInWithEmailAndPassword(auth, loginEmail, password);
      console.log("✅ Logged in:", userCred.user.email);
      setUser(userCred.user);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 SIGNUP — create user if account doesn’t exist yet
  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      // if user typed username instead of email, ask for an email
      if (!identifier.includes("@")) {
        throw new Error("Please sign up with a valid email address.");
      }
      const userCred = await createUserWithEmailAndPassword(auth, identifier, password);
      // store email/username pair (for now, username = part before @)
      const username = identifier.split("@")[0];
      await setDoc(doc(db, "users", userCred.user.uid), {
        username,
        email: identifier,
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
    <div
      className="auth-box"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: 320,
        margin: "auto",
        textAlign: "center",
      }}
    >
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <label style={{ fontWeight: 600, textAlign: "left" }}>Username or Email:</label>
          <input
            placeholder="Enter username or email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <label style={{ fontWeight: 600, textAlign: "left" }}>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div style={{ marginTop: 12 }}>
            <button onClick={handleLogin} disabled={loading}>
              {loading ? "..." : "Login"}
            </button>
            <button
              onClick={handleSignup}
              disabled={loading}
              style={{ marginLeft: 8 }}
            >
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
