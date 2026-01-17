import React from "react";
const tabs = ["Profile", "Security", "Notifications", "Preferences"];

const SettingsTabs = ({ active, setActive }) => (
  <div className="flex gap-2 mb-6">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => setActive(tab)}
        className={`px-4 py-1 text-sm rounded-lg border ${
          active === tab
            ? "bg-[#00D1FF]/20 text-[#00D1FF] border-[#00D1FF]/40"
            : "bg-white/5 text-gray-300 border-white/10"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default SettingsTabs;
