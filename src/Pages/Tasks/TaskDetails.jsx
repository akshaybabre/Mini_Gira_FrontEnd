import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const statusBadge = {
  Todo: "bg-yellow-500/20 text-yellow-400",
  "In Progress": "bg-blue-500/20 text-blue-400",
  Done: "bg-green-500/20 text-green-400",
};

const priorityColor = {
  High: "text-red-400",
  Medium: "text-purple-400",
  Low: "text-gray-300",
};

const TaskDetails = () => {
  const { id } = useParams();
  const { tasks } = useSelector((state) => state.tasks);

  const task = tasks.find((t) => t._id === id);

  if (!task)
    return <div className="p-6 text-white">Task not found</div>;

  return (
    <div className="p-6 text-white space-y-6">

      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <p className="text-gray-400 text-sm mt-1">
          {task.description || "No description provided"}
        </p>
      </div>

      {/* META INFO */}
      <div className="grid md:grid-cols-2 gap-4 text-sm">

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Project</p>
          <p className="font-medium">
            {task.project?.name || "N/A"}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Team</p>
          <p className="font-medium">
            {task.team?.name || "N/A"}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Status</p>
          <span
            className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs ${statusBadge[task.status]}`}
          >
            {task.status}
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Priority</p>
          <p className={`font-medium ${priorityColor[task.priority]}`}>
            {task.priority}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Assigned To</p>
          <p className="font-medium">
            {task.assignedTo?.name || "Unassigned"}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Created By</p>
          <p className="font-medium">
            {task.createdBy?.name || "N/A"}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Created At</p>
          <p>
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Last Updated</p>
          <p>
            {new Date(task.updatedAt).toLocaleDateString()}
          </p>
        </div>

      </div>

      {/* TABS */}
      <div className="flex gap-3">
        {["Overview", "Comments", "History"].map((tab) => (
          <button
            key={tab}
            className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-lg hover:bg-white/10"
          >
            {tab}
          </button>
        ))}
      </div>

    </div>
  );
};

export default TaskDetails;