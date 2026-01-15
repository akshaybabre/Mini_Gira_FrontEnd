import React from "react";
import { ToastContainer } from "react-toastify";

const Toaster = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}

      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"

      /* ✅ smooth stacking gap */
      toastStyle={{ marginBottom: "12px" }}

      /* ✅ timeline ko smooth banata hai */
      progressClassName="toast-progress-smooth"

      toastClassName={({ type }) =>
        `
        flex items-center gap-3
        rounded-xl px-5 py-4
        text-sm font-medium text-white
        shadow-lg
        w-[360px] max-w-[95vw]

        ${
          type === "success"
            ? "bg-gradient-to-r from-green-500 to-green-600"
            : type === "error"
            ? "bg-gradient-to-r from-red-500 to-red-600"
            : type === "warning"
            ? "bg-gradient-to-r from-yellow-500 to-orange-500"
            : "bg-gradient-to-r from-blue-500 to-blue-600"
        }
        `
      }
    />
  );
};

export default Toaster;
