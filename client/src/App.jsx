import { useState } from "react";
import AuthForm from "./components/AuthForm";
import ReflectionList from "./components/ReflectionList";
import Quote from "./components/Quote";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app" style ={{ textAlign: "center", padding: "20px" }}>
      <h1>Human Flourishing App</h1>
      <Quote />
      <AuthForm user={user} setUser={setUser} />
      {user && <ReflectionList user={user} />}
    </div>
  );
}
