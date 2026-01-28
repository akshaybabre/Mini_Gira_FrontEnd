import React from "react";
import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import MemberDashboard from "./MemberDashboard/MemberDashboard";

const RoleBasedLayout = () => {
  const { user } = useSelector((state) => state.authentication);

  if (!user) return null;

  // ADMIN → Full layout
  if (user.role === "admin") {
    return <AdminDashboard />;
  }

  // MEMBER → No sidebar, no header
  return <MemberDashboard />;
};

export default RoleBasedLayout;
