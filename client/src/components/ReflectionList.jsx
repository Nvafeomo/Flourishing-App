import { useState, useEffect } from "react";
import { fetchReflections, addReflection, deleteReflection } from "../api";
import "../styles/ReflectionList.css";

export default function ReflectionList({ user }) {
  const [reflections, setReflections] = useState([]);
  const [newReflection, setNewReflection] = useState("");
  const [reflectionDate, setReflectionDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to today's date

  useEffect(() => {
    if (user) {
      fetchReflections(user.uid)
        .then((data) => {
          // Ensure we always set an array
          setReflections(Array.isArray(data) ? data : []);
        })
        .catch((error) => {
          console.error("Error fetching reflections:", error);
          alert("Failed to load reflections. Please try refreshing the page.");
          setReflections([]); // Set empty array on error
        });
    } else {
      setReflections([]);
    }
  }, [user]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleAdd = async () => {
    if (!newReflection.trim()) {
      alert("Please enter some text before adding a reflection.");
      return;
    }
    
    try {
      const added = await addReflection({
        userId: user.uid,
        content: newReflection.trim(),
        reflectionDate: new Date(reflectionDate || new Date().toISOString().split("T")[0]),
      });
      if (added && added._id) {
        setReflections([added, ...reflections]);
        setNewReflection("");
        setReflectionDate(new Date().toISOString().split("T")[0]); // Reset to today
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error adding reflection:", error);
      const errorMessage = error.response?.data?.error || error.message || "Failed to add reflection. Please try again.";
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleDelete = async (reflectionId) => {
    if (!window.confirm("Are you sure you want to delete this reflection?")) {
      return;
    }
    
    try {
      await deleteReflection(reflectionId);
      setReflections(reflections.filter((r) => r._id !== reflectionId));
    } catch (error) {
      console.error("Error deleting reflection:", error);
      const errorMessage = error.response?.data?.error || error.message || "Failed to delete reflection. Please try again.";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="reflection-list-container">
      <h2>Your Reflections</h2>
      
      <div className="reflection-form">
        <div className="form-group">
          <label htmlFor="reflection-date">Date:</label>
          <input
            id="reflection-date"
            type="date"
            value={reflectionDate}
            onChange={(e) => setReflectionDate(e.target.value)}
            className="date-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="reflection-content">Your Reflection:</label>
          <textarea
            id="reflection-content"
            placeholder="Write your reflection here..."
            value={newReflection}
            onChange={(e) => setNewReflection(e.target.value)}
            className="reflection-textarea"
            rows="4"
          />
        </div>
        
        <button onClick={handleAdd} className="add-button">Add Reflection</button>
      </div>

      <div className="reflections-list">
        {reflections.length === 0 ? (
          <p className="no-reflections">No reflections yet. Start reflecting!</p>
        ) : (
          reflections.map((r) => (
            <div key={r._id} className="reflection-item">
              <button
                className="delete-button"
                onClick={() => handleDelete(r._id)}
                aria-label="Delete reflection"
              >
                ×
              </button>
              <div className="reflection-date">
                {formatDate(r.reflectionDate || r.createdAt)}
              </div>
              <div className="reflection-content">{r.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
