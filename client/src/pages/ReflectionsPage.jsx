import ReflectionList from "../components/ReflectionList";

export default function ReflectionsPage({ user }) {
  return (
    <div style={{ padding: "2em" }}>
      <h1>Your Reflections</h1>
      <ReflectionList user={user} />
    </div>
  );
}
