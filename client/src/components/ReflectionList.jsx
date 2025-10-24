import { useState, useEffect } from "react";
import { fetchReflections, addReflection } from "../api";

export default function ReflectionList({ user }) {
  const [reflections, setReflections] = useState([]);
  const [newReflection, setNewReflection] = useState("");

  useEffect(() => {
    if (user) {
      fetchReflections(user.uid).then(setReflections);
    }
  }, [user]);

  const handleAdd = async () => {
    const added = await addReflection({ userId: user.uid, content: newReflection });
    setReflections([added, ...reflections]);
    setNewReflection("");
  };

  return (
    <div>
      <h2>Your Reflections</h2>
      <textarea
        placeholder="Write something..."
        value={newReflection}
        onChange={(e) => setNewReflection(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {reflections.map((r) => (
          <li key={r._id}>{r.content}</li>
        ))}
      </ul>
    </div>
  );
}
