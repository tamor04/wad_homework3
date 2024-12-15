import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Backend API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add authorization header dynamically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
