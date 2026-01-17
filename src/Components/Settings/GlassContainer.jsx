import React from "react";
const GlassContainer = ({ children }) => (
  <div className="bg-gradient-to-br from-[#0B1220]/80 to-[#05070F]/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg p-6 text-white">
    {children}
  </div>
);

export default GlassContainer;
