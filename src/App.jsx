import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./Pages/Authentication/Register";
import Login from "./Pages/Authentication/Login";
import Dashboard from "./Pages/Dashboard/Dashboard"
import ProtectedRoute from "./Routes/ProtectedRoute"

function App() {
  return (
    <Router>

      {/* 🔥 TOAST CONTAINER (VERY IMPORTANT) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

    </Router>
  );
}

export default App;
