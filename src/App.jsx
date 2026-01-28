import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./Pages/Authentication/Register";
import Login from "./Pages/Authentication/Login";
import ProtectedRoute from "./Routes/ProtectedRoute"
import GiraAnalyticsDashboard from "./Pages/Dashboard/GiraAnalyticsDashboard";
import ProjectsList from "./Pages/Projects/ProjectsList";
import ProjectDetails from "./Pages/Projects/ProjectDetails";
import TasksList from "./Pages/Tasks/TasksList";
import TaskDetails from "./Pages/Tasks/TaskDetails";
import TeamsList from "./Pages/Teams/TeamsList";
import TeamDetails from "./Pages/Teams/TeamDetails";
import SprintsList from "./Pages/Sprints/SprintsList"
import SprintDetails from "./Pages/Sprints/SprintDetails"
import SettingsHome from "./Pages/Settings/SettingsHome"
import RoleBasedLayout from "./Components/dashboard/RoleBasedLayout";


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
              <RoleBasedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<GiraAnalyticsDashboard  />} />

          <Route path="projects" element={<ProjectsList />} />
          <Route path="projects/:id" element={<ProjectDetails />} />

          <Route path="tasks" element={<TasksList />} />
          <Route path="tasks/:id" element={<TaskDetails />} />

          <Route path="teams" element={<TeamsList />} />
          <Route path="teams/:id" element={<TeamDetails />} />

          <Route path="sprints" element={<SprintsList />} />
          <Route path="sprints/:id" element={<SprintDetails />} />

          <Route path="settings" element={<SettingsHome />} />

        </Route>



        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

    </Router>
  );
}

export default App;
