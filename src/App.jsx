import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./Pages/Authentication/Register";
import Login from "./Pages/Authentication/Login";
import ProtectedRoute from "./Routes/ProtectedRoute"
import DashboardLayout  from "./Components/dashboard/DashboardLayout";
import DashboardHome  from "./Pages/Dashboard/DashboardHome";

import Projects from "./Pages/Dashboard/Projects";
import Teams from "./Pages/Dashboard/Teams";
import Sprints from "./Pages/Dashboard/Sprints";
import Tasks from "./Pages/Dashboard/Tasks";
import Settings from "./Pages/Dashboard/Settings";

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
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />

          <Route path="projects" element={<Projects />} />
          <Route path="teams" element={<Teams />} />
          <Route path="sprints" element={<Sprints />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

    </Router>
  );
}

export default App;
