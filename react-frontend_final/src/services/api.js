// Main API service - connects to Laravel backend
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth endpoints
export const loginUser = (credentials) =>
  api.post("/login", credentials);
export const logoutUser = () =>
  api.post("/logout");

// Dashboard data endpoints
export const getEnrollmentData = () =>
  api.get("/dashboard/enrollment");
export const getCourseData = () =>
  api.get("/dashboard/courses");
export const getAttendanceData = () =>
  api.get("/dashboard/attendance");

// Students & Courses
export const getStudents = () => api.get("/students");
export const getCourses = () =>  api.get("/courses");

export default api;