import React from "react";
import GlassContainer from "./GlassContainer";

const statusColor = {
  Active: "bg-blue-500/20 text-blue-400",
  Completed: "bg-purple-500/20 text-purple-400",
  Archived: "bg-gray-500/20 text-gray-300",
};

const ProjectCard = ({ project, onView, onEdit, onDelete }) => {
  return (
    <GlassContainer>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-white">
          {project.name}
        </h2>

        <p className="text-sm text-gray-400 line-clamp-2">
          {project.description || "No description"}
        </p>

        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-500">
            Key: {project.key}
          </span>

          <span
            className={`px-2 py-1 text-xs rounded-full ${statusColor[project.status]
              }`}
          >
            {project.status}
          </span>
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onView(project)}
            className="text-xs px-3 py-1 bg-[#00D1FF]/10 text-[#00D1FF] rounded-lg hover:bg-[#00D1FF]/20"
          >
            View
          </button>

          <button
            onClick={() => onEdit(project)}
            className="text-xs px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-lg hover:bg-yellow-500/20"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(project)}
            className="text-xs px-3 py-1 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
          >
            Delete
          </button>
        </div>
      </div>
    </GlassContainer>
  );
};

export default ProjectCard;
