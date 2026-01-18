import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";

const DeleteConfirmModal = ({ onConfirm, onCancel, projectName }) => {
  const modalRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { scale: 0.8, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
    );
  }, []);

  const handleClose = () => {
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
      <div
        ref={modalRef}
        className="relative w-[90%] max-w-[420px] rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-5 sm:p-7 text-white"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-base sm:text-lg font-semibold mb-2">
          Confirm Delete
        </h2>

        <p className="text-xs sm:text-sm text-gray-300 mb-6">
          Are you sure you want to delete{" "}
          <span className="text-red-400 font-medium">{projectName}</span>?
          This action cannot be undone.
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
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gradient-to-r from-red-400 to-red-600 text-black font-semibold hover:opacity-90 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
