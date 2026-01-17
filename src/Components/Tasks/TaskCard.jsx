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

const TaskCard = ({ task, onView, onDelete }) => {
  return (
    <GlassContainer>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-white">{task.title}</h2>
        <p className="text-sm text-gray-400">{task.description}</p>

        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span className={`${statusColor[task.status]} px-2 py-1 rounded-full`}>
            {task.status}
          </span>
          <span className={priorityColor[task.priority]}>
            {task.priority} Priority
          </span>
        </div>

        <div className="text-xs text-gray-500 mt-1">
          Assigned to: {task.assignedTo}
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onView(task)}
            className="px-3 py-1 text-xs bg-[#00D1FF]/10 text-[#00D1FF] rounded-lg hover:bg-[#00D1FF]/20"
          >
            View
          </button>

          <button
            onClick={() => onDelete(task)}
            className="px-3 py-1 text-xs bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
          >
            Delete
          </button>
        </div>
      </div>
    </GlassContainer>
  );
};

export default TaskCard;
