import axios from "axios";

const API_BASE = "http://localhost:5001/api";

export const fetchReflections = async (userId) => {
  const res = await axios.get(`${API_BASE}/reflections/${userId}`);
  return res.data;
};

export const addReflection = async (reflection) => {
  const res = await axios.post(`${API_BASE}/reflections`, reflection);
  return res.data;
};

export const deleteReflection = async (reflectionId) => {
  const res = await axios.delete(`${API_BASE}/reflections/${reflectionId}`);
  return res.data;
};