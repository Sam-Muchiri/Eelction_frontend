// Centralized axios instance + helpers
import axios from "axios";

export const API_BASE = "http://127.0.0.1:8000/api/";     // change if needed
export const API = axios.create({ baseURL: API_BASE });

// If your Django serves images via MEDIA_URL=/media/, the <img src> will work
// with relative paths. If you need absolute URLs, use helper below:
export const mediaURL = (path) => {
  if (!path) return "";
  // If it's already absolute, return as is
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  // Else prefix with API_BASE (and ensure leading slash)
  return `${API_BASE.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;
};
