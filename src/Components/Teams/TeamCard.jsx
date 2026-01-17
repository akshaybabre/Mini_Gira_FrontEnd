import React from "react";
import GlassContainer from "./GlassContainer";

const TeamCard = ({ team, onView, onDelete }) => {
  return (
    <GlassContainer>
      <div className="flex flex-col gap-2 text-white">
        <h2 className="text-lg font-semibold">{team.name}</h2>
        <p className="text-sm text-gray-400">{team.description}</p>

        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Project: {team.project}</span>
          <span>Members: {team.members.length}</span>
        </div>

        <div className="text-xs text-gray-500 mt-1">
          Created By: {team.createdBy}
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onView(team)}
            className="px-3 py-1 text-xs bg-[#00D1FF]/10 text-[#00D1FF] rounded-lg hover:bg-[#00D1FF]/20"
          >
            View
          </button>

          <button
            onClick={() => onDelete(team)}
            className="px-3 py-1 text-xs bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
          >
            Delete
          </button>
        </div>
      </div>
    </GlassContainer>
  );
};

export default TeamCard;
