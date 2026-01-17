import React from "react";
const TeamTabs = ({ active, setActive }) => {
  const tabs = ["Overview", "Members", "Assigned Tasks"];

  return (
    <div className="flex gap-2 mt-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-3 py-1 text-sm rounded-lg border ${
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
};

export default TeamTabs;
