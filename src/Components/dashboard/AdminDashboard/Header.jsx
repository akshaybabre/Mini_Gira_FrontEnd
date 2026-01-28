import React, { useState } from "react";
import { Menu, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutUser, logoutUserThunk } from "../../../Redux/Authentication/AuthSlice";
import { toast } from "react-toastify";
import LogoutModal from "./LogoutModal";


const Header = ({ toggle }) => {
  const { user } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      <header
        className="
        sticky top-0 z-30
        h-15
        flex items-center justify-between
        px-4 sm:px-6
        bg-white/5 backdrop-blur-2xl
        border-b border-white/10
        shadow-[inset_0_-1px_0_rgba(255,255,255,0.06)]
      "
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="
            md:hidden
            text-gray-400 hover:text-white
            transition
          "
          >
            <Menu />
          </button>

          <h2 className="text-lg font-semibold text-white tracking-wide">
            {/* User Name */}
            <span className="hidden sm:block text-sm text-gray-400">
              Hi,{" "}
              <span className="text-white font-medium">
                {user?.name}
              </span>
            </span>
          </h2>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* Logout Button */}
          <button
            onClick={() => setShowLogout(true)}
            className="
            group flex items-center gap-2
            px-4 py-2 rounded-xl
            text-sm font-medium
            text-gray-300
            bg-white/5 backdrop-blur-xl
            border border-white/10
            hover:text-white
            hover:bg-white/10
            transition-all duration-300
            shadow-[0_0_0_rgba(0,0,0,0)]
            hover:shadow-[0_0_20px_rgba(56,189,248,0.35)]
          "
          >
            <LogOut size={16} className="group-hover:text-cyan-300 transition" />
            Logout
          </button>
        </div>

        {showLogout && (
          <LogoutModal
            onCancel={() => setShowLogout(false)}
            onConfirm={async () => {
              await dispatch(logoutUserThunk());
              dispatch(logoutUser());
              toast.success("Logout successful 🎉");
              navigate("/login");
            }}
          />
        )}
      </header>
      {showLogout && (
        <LogoutModal
          onCancel={() => setShowLogout(false)}
          onConfirm={async () => {
            await dispatch(logoutUserThunk());
            dispatch(logoutUser());
            toast.success("Logout successful 🎉");
            navigate("/login");
          }}
        />
      )}
    </>
  );
};

export default Header;
