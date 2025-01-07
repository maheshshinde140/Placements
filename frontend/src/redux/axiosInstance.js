import axios from "axios";
import Cookies from "js-cookie"; // Import Cookies for secure token handling

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://placements-zrea.onrender.com/api", // Use environment variable or fallback
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to attach the token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("mpsp") || localStorage.getItem("mpsp");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle unauthorized errors globally
//     if (error.response && error.response.status === 401) {
//       // Optionally, redirect to login page or clear token
//       Cookies.remove("token", { path: "/" });
//       window.location.href = "/login"; // Redirect to login page
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
