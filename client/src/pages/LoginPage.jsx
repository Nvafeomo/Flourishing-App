import AuthForm from "../components/AuthForm";

export default function LoginPage({ setUser }) {
  return (
    <div style={{ textAlign: "center", marginTop: "3em" }}>
      <h1>Welcome to Human Flourishing Reflections</h1>
      <p>Please log in or sign up to continue.</p>
      <AuthForm setUser={setUser} />
    </div>
  );
}
