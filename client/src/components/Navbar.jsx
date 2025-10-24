import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  return (
    <nav style={{ background: "#444", padding: "1em", textAlign: "center" }}>
      {user && (
        <>
          <Link to="/mindfulness" style={{ color: "#fff", margin: "0 10px" }}>Mindfulness</Link>
          <Link to="/reflections" style={{ color: "#fff", margin: "0 10px" }}>Reflections</Link>
          <Link to="/quotes" style={{ color: "#fff", margin: "0 10px" }}>Quotes</Link>
        </>
      )}
    </nav>
  );
}
