import React from "react";
import GlassContainer from "./GlassContainer";

const TeamCard = ({ team, onView, onEdit, onDelete }) => {
  return (
    <GlassContainer>
      <div className="flex flex-col gap-2 text-white">

        {/* TEAM NAME */}
        <h2 className="text-lg font-semibold">{team.name}</h2>

        {/* DESCRIPTION */}
        {team.description && (
          <p className="text-sm text-gray-400">{team.description}</p>
        )}

        {/* META INFO */}
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>
            Project:{" "}
            <span className="text-white">
              {team.project?.name || "—"}
            </span>
          </span>

          <span>
            Members: {team.members?.length || 0}
          </span>
        </div>

        {/* CREATED BY */}
        <div className="text-xs text-gray-500 mt-1">
          Created By:{" "}
          <span className="text-gray-300">
            {team.createdBy?.name || "—"}
          </span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onView(team)}
            className="px-3 py-1 text-xs bg-[#00D1FF]/10 text-[#00D1FF] rounded-lg hover:bg-[#00D1FF]/20 transition"
          >
            View
          </button>

          <button
            onClick={() => onEdit(team)}
            className="px-3 py-1 text-xs bg-yellow-500/10 text-yellow-400 rounded-lg hover:bg-yellow-500/20 transition"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(team)}
            className="px-3 py-1 text-xs bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition"
          >
            Delete
          </button>
        </div>

      </div>
    </GlassContainer>
  );
};

export default TeamCard;