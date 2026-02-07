import React from "react";
import GlassContainer from "./GlassContainer";

const statusColor = {
  Todo: "text-yellow-400 bg-yellow-500/10",
  "In Progress": "text-blue-400 bg-blue-500/10",
  Done: "text-green-400 bg-green-500/10",
};

const priorityColor = {
  High: "text-red-400",
  Medium: "text-purple-400",
  Low: "text-gray-300",
};

const TaskCard = ({ task, onView, onEdit, onDelete }) => {
  return (
    <GlassContainer>
      <div className="flex flex-col gap-2 text-white">

        <h2 className="text-lg font-semibold">
          {task.title}
        </h2>

        {task.description && (
          <p className="text-sm text-gray-400 line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="text-xs text-gray-400 flex gap-2">
          <span>📁 {task.project?.name}</span>
          <span>•</span>
          <span>👥 {task.team?.name}</span>
        </div>

        <div className="flex justify-between text-xs mt-2">
          <span className="px-2 py-1 rounded-full bg-white/10">
            {task.status}
          </span>
          <span>{task.priority} Priority</span>
        </div>

        <div className="text-xs text-gray-500 mt-1">
          Assigned to: {task.assignedTo?.name}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onView(task)}
            className="px-3 py-1 text-xs bg-[#00D1FF]/10 text-[#00D1FF] rounded-lg"
          >
            View
          </button>

          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 text-xs bg-yellow-500/10 text-yellow-400 rounded-lg"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task)}
            className="px-3 py-1 text-xs bg-red-500/10 text-red-400 rounded-lg"
          >
            Delete
          </button>
        </div>

      </div>
    </GlassContainer>
  );
};

export default TaskCard;