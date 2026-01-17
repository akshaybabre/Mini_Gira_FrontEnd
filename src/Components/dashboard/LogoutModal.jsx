import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";

const LogoutModal = ({ onConfirm, onCancel }) => {
  const modalRef = useRef();

  useEffect(() => {
    // Open Animation
    gsap.fromTo(
      modalRef.current,
      { scale: 0.8, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
    );
  }, []);

  const handleClose = () => {
    // Close Animation
    gsap.to(modalRef.current, {
      scale: 0.8,
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power3.in",
      onComplete: onCancel,
    });
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Modal Box */}
      <div
        ref={modalRef}
        className="relative w-[90%] max-w-[420px] rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-5 sm:p-7
 shadow-[0_0_40px_rgba(0,0,0,0.5)] text-white"
      >
        {/* ❌ Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-base sm:text-lg font-semibold mb-2">Confirm Logout</h2>
        <p className="text-xs sm:text-sm text-gray-300 mb-6">
          Are you sure you want to logout?
        </p>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white/5 hover:bg-white/15 text-gray-200 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
