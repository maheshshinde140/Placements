import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./component/Sidebar";
import Home from "./Pages/home/home";
import Job from "./Pages/home/Job";
import Notification from "./Pages/home/Notification";
import Login from "./Pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GAdminRoutes from "./Routes/GAdminRoutes";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Fix import for jwt-decode
import JobDetails from "./Pages/home/Jobdetails";
import { Internship } from "./Pages/home/Internship";
import TAdminRoutes from "./Routes/TAdminRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const tokenFromCookies = Cookies.get("mpsp") || token;
    if (window.location.pathname !== "/login") {
      if (tokenFromCookies) {
        try {
          const decoded = jwtDecode(tokenFromCookies);
          // Check if token is expired
          if (decoded.exp * 1000 < Date.now()) {
            Cookies.remove("mpsp");
            window.location.href = "/login";
          } else {
            // Set background color based on role
            if (decoded.role === "student") {
              document.body.style.backgroundColor = "rgb(22, 22, 59)";
            } else if (decoded.role === "global_admin") {
              document.body.style.backgroundColor = "rgb(26, 32, 44)";
            }
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          Cookies.remove("mpsp");
          window.location.href = "/login";
        }
      } else {
        document.body.style.backgroundColor = "rgba(255, 255, 255, 0)";
      }
    }
    setLoading(false); // Set loading to false after checks
  }, [token]);

  const ProtectedRoute = ({ children, allowedRoles }) => {
    const tokenFromCookies = Cookies.get("mpsp") || token;
    if (!tokenFromCookies) return <Navigate to="/login" />;

    try {
      const decoded = jwtDecode(tokenFromCookies);
      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        Cookies.remove("mpsp");
        return <Navigate to="/login" />;
      }
      // Check if user role is allowed
      if (allowedRoles.includes(decoded.role)) {
        return children;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      Cookies.remove("mpsp");
      return <Navigate to="/login" />;
    }
    return <Navigate to="/login" />;
  };

  const checkUserRole = () => {
    const tokenFromCookies = Cookies.get("mpsp") || token;
    if (tokenFromCookies) {
      try {
        const decoded = jwtDecode(tokenFromCookies);
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          Cookies.remove("mpsp");
          return "/login";
        }
        // Validate role and return appropriate route
        if (decoded && decoded.role && ["student", "global_admin", "tnp_admin"].includes(decoded.role)) {
          if (decoded.role === "student") return "/";
          else if (decoded.role === "global_admin") return "/gadmin/dashboard";
          else if (decoded.role === "tnp_admin") return "/tadmin/dashboard";
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        Cookies.remove("mpsp");
      }
    }
    return "/login";
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route
          path="/login"
          element={
            !token && !Cookies.get("mpsp") ? (
              <Login />
            ) : (
              <Navigate to={checkUserRole()} />
            )
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["student", "tnp_admin", "global_admin"]}>
              <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-gray-200 p-3 rounded-l-3xl">
                  <Home />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/job"
          element={
            <ProtectedRoute allowedRoles={["student", "tnp_admin", "global_admin"]}>
              <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-gray-200 p-6 rounded-l-3xl">
                  <Job />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/job/:jobId"
          element={
            <ProtectedRoute allowedRoles={["student", "tnp_admin", "global_admin"]}>
              <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-gray-200 p-6 rounded-l-3xl">
                  <JobDetails />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/internship"
          element={
            <ProtectedRoute allowedRoles={["student", "tnp_admin", "global_admin"]}>
              <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-gray-200 p-6 rounded-l-3xl">
                  <Internship />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notify"
          element={
            <ProtectedRoute allowedRoles={["student", "tnp_admin", "global_admin"]}>
              <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-gray-200 p-6 rounded-l-3xl">
                  <Notification />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
       
        {/* GAdmin Routes */}
        <Route
          path="/gadmin/*"
          element={
            <ProtectedRoute allowedRoles={["global_admin"]}>
              <GAdminRoutes />
            </ProtectedRoute>
          }
        />
        {/* TAdmin Routes */}
        <Route
          path="/tadmin/*"
          element={
            <ProtectedRoute allowedRoles={["tnp_admin"]}>
              <TAdminRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </Router>
  );
}

export default App;