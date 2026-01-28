import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FolderKanban, CheckSquare, LogOut } from "lucide-react";
import { logoutUser, logoutUserThunk } from "../../../Redux/Authentication/AuthSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MemberDashboard = () => {
  const { user } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
    dispatch(logoutUser());
    toast.success("Logged out successfully 👋");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white px-6 py-10">

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold tracking-wide">
            Welcome, {user?.name} 👋
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Company:{" "}
            <span className="text-cyan-400 font-medium">
              {user?.company}
            </span>
          </p>

          <span className="inline-block mt-3 px-4 py-1.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Role: {user?.role}
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400 transition-all duration-300"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* My Tasks Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-blue-500/30 transition">
          <div className="flex items-center gap-3 mb-4">
            <CheckSquare className="text-blue-400" />
            <h2 className="text-lg font-semibold">My Tasks</h2>
          </div>
          <p className="text-gray-400 text-sm">
            You don’t have any assigned tasks yet.
          </p>
        </div>

        {/* My Projects Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-purple-500/30 transition">
          <div className="flex items-center gap-3 mb-4">
            <FolderKanban className="text-purple-400" />
            <h2 className="text-lg font-semibold">My Projects</h2>
          </div>
          <p className="text-gray-400 text-sm">
            No projects assigned yet.
          </p>
        </div>

      </div>
    </div>
  );
};

export default MemberDashboard;
