import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { navigation } from "./Navigation";
import { X } from "lucide-react";
import LogoutModal from "./LogoutModal";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logoutUser, logoutUserThunk } from "../../Redux/Authentication/AuthSlice";

const LeftMenu = ({ open, onClose }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);


  return (
    <>
      {/* 🔲 Mobile Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`
              z-50
              h-screen w-72
              bg-white/5 backdrop-blur-2xl
              border-r border-white/10
              shadow-[0_0_60px_rgba(0,0,0,0.7)]
              transition-transform duration-300 ease-out
              md:sticky md:top-0 md:translate-x-0
              fixed 
              ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}
      >

        {/* 🧊 Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 h-15">
          <h1 className="text-lg font-semibold text-white tracking-wide">
            ✨ Mini Gira
          </h1>

          {/* ❌ Close (Mobile) */}
          <button
            onClick={onClose}
            className="md:hidden text-gray-400 hover:text-white transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* 🚀 Navigation */}
        <nav className="px-4 mt-6 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={(e) => {
                  if (item.name === "Logout") {
                    e.preventDefault();
                    setShowLogout(true);
                  } else if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
                className={`
                  relative group flex items-center gap-3
                  px-4 py-3 rounded-xl
                  text-sm font-medium
                  transition-all duration-300
                  ${isActive
                    ? `
                        text-white
                        bg-white/10
                        shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]
                      `
                    : `
                        text-gray-400
                        hover:text-white
                        hover:bg-white/5
                      `
                  }
                `}
              >
                {/* 🔹 Active Accent Bar */}
                {isActive && (
                  <span
                    className="
                      absolute left-0 top-1/2 -translate-y-1/2
                      h-6 w-1 rounded-full
                      bg-gradient-to-b from-cyan-400 to-blue-500
                      shadow-[0_0_12px_rgba(56,189,248,0.9)]
                    "
                  />
                )}

                {/* Icon */}
                <Icon
                  size={18}
                  className={`
                    transition-colors duration-300
                    ${isActive
                      ? "text-cyan-300"
                      : "text-gray-500 group-hover:text-white"
                    }
                  `}
                />

                {/* Text */}
                <span className="tracking-wide">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
      {showLogout && (
        <LogoutModal
          onCancel={() => setShowLogout(false)}
          onConfirm={async () => {
            await dispatch(logoutUserThunk());
            dispatch(logoutUser());
            navigate("/login");
            toast.success("Logout successful 🎉");
          }}

        />
      )}
    </>
  );
};

export default LeftMenu;
