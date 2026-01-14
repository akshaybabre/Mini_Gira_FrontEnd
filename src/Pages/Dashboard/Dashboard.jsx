import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk, logoutUser  } from "../../Redux/Authentication/AuthSlice";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authentication);


  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
    dispatch(logoutUser());
    toast.success("Logout Successfully...");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-500 to-sky-400 p-6">

      {/* TOP BAR */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-700">
            Welcome to Dashboard - {user?.name}
          </h1>
          <p className="text-gray-500 text-sm">
            {user?.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 font-semibold hover:underline"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* CARD 1 */}
        <div className="bg-white/90 rounded-2xl shadow-lg p-6 hover:scale-[1.02] transition">
          <User className="text-blue-600 mb-3" />
          <h3 className="text-xl font-bold text-gray-800">
            Login Status
          </h3>
          <p className="text-green-600 font-semibold mt-2">
            ✅ Logged in successfully
          </p>
        </div>

        {/* CARD 2 */}
        <div className="bg-white/90 rounded-2xl shadow-lg p-6 hover:scale-[1.02] transition">
          <LayoutDashboard className="text-indigo-600 mb-3" />
          <h3 className="text-xl font-bold text-gray-800">
            Projects
          </h3>
          <p className="text-gray-500 mt-2">
            Project module coming next 🚀
          </p>
        </div>

        {/* CARD 3 */}
        <div className="bg-white/90 rounded-2xl shadow-lg p-6 hover:scale-[1.02] transition">
          <LayoutDashboard className="text-sky-600 mb-3" />
          <h3 className="text-xl font-bold text-gray-800">
            Tasks & Sprints
          </h3>
          <p className="text-gray-500 mt-2">
            Sprint board coming soon 💪
          </p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
