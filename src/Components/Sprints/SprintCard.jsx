import React from "react";
import GlassContainer from "./GlassContainer";

const SprintCard = ({ sprint, onView, onDelete }) => {
  return (
    <GlassContainer>
      <div className="flex flex-col gap-2 text-white">
        <h2 className="text-lg font-semibold">{sprint.name}</h2>
        <p className="text-sm text-gray-400">{sprint.project}</p>

        <div className="text-xs text-gray-500">
          {sprint.startDate} → {sprint.endDate}
        </div>

        <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 w-fit">
          {sprint.status}
        </span>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onView(sprint)}
            className="text-xs px-3 py-1 bg-[#00D1FF]/10 text-[#00D1FF] rounded-lg hover:bg-[#00D1FF]/20"
          >
            View
          </button>
          <button
            onClick={() => onDelete(sprint)}
            className="text-xs px-3 py-1 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
          >
            Delete
          </button>
        </div>
      </div>
    </GlassContainer>
  );
};

export default SprintCard;
